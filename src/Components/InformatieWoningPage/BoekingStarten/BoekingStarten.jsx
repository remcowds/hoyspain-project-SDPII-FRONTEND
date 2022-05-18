import { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

import DateRangeBoeking from '../DateRangeBoeking';
import { BookingContext } from '../../../contexts/BookingProvider';
import { DateToText, getDatesInRange } from '../../../core/dateFns';
import BoekingStartenPrijsBerekening from './BoekingStartenPrijsBerekening';
import BoekingStartenData from './BoekingStartenData';
import { fixprijs } from '../../../core/prijzen';
import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const serviceKost = 50;

const getPrijsBerFromArr = (arr) => {
	//verschillende prijzen
	const verschillende = [...new Set(arr)];
	const prijsberekening = [];
	verschillende.forEach((currprijs) => {
		//tellen hoeveel elke voorkomt
		const nachten = arr.filter((prijs) => prijs === currprijs).length;
		prijsberekening.push({ prijs: currprijs, nachten });
	});

	return prijsberekening;
};

export default function BoekingStarten({ id, woning }) {
	const {
		prijsPerNachtPerPersoon,
		rating,
		regio,
		prijsAanpassing,
		maandKortingPercent,
		kortingNachten,
		kortingPercent,
		bijkomendeKosten,
		waarborg,
		aantalPersonen: maxAantalPersonen,
	} = woning;

	const eenMaligeBijkomendeKostTotaal = bijkomendeKosten
		.filter((kost) => kost.eenmalig === true)
		.map((kost) => kost.prijs)
		.reduce((a, b) => a + b, 0);

	const perNachtBijkomendeKost1Nacht = bijkomendeKosten
		.filter((kost) => kost.eenmalig === false)
		.map((kost) => kost.prijs)
		.reduce((a, b) => a + b, 0);

	const { boekingDetails } = useContext(BookingContext);
	const { t } = useTranslation();

	const [canRedirect, setCanRedirect] = useState(false);
	const [datums, setDatums] = useState([null, null]);
	const [aantalNachten, setAantalNachten] = useState(1);
	const [gasten, setGasten] = useState(1);
	const [prijsVerblijf, setPrijsVerblijf] = useState(prijsPerNachtPerPersoon);
	const [prijsBerekening, setPrijsBerekening] = useState([]);
	const [totaalPrijs, setTotaalPrijs] = useState(
		fixprijs(
			serviceKost +
				Number(waarborg) +
				Number(prijsPerNachtPerPersoon) +
				eenMaligeBijkomendeKostTotaal +
				perNachtBijkomendeKost1Nacht
		)
	);
	const [prijsVoorKorting, setPrijsVoorKorting] = useState(totaalPrijs);
	const [korting, setKorting] = useState(0);

	//aantalnachten
	useEffect(() => {
		if (!datums[0] || !datums[1]) {
			return;
		}
		let aantal = datums[1].getTime() - datums[0].getTime();
		aantal = Math.round(aantal / (1000 * 60 * 60 * 24));
		setAantalNachten(aantal);
	}, [datums]);

	const handleAantalGasten = useCallback((e) => {
		localStorage.setItem("Persons", e.target.value)
		setGasten(Number(e.target.value));
	}, []);

	useEffect(() => {
		if (!datums[0] || !datums[1]) return;
		//alle dagen apart v/d gevraagde boekperiode
		const allDatesReq = getDatesInRange(datums[0], datums[1]);

		//de totaalprijs
		let totaal = 0;
		//array voor de berekening te laten zien
		const totaalArray = [];

		//voor elke dag de prijs bepalen
		allDatesReq.forEach((date) => {
			let toeTeVoegen = Number(prijsPerNachtPerPersoon);
			//in alle 'special price' objecten zien of de huidige datum erin ligt
			//if so -> totaal vermeerderen daarmee
			//anders -> totaal vermeerderen met prijsPerNachtPerPersoon
			for (const o of prijsAanpassing) {
				const datum1 = new Date(o.data[0]).setHours(0);
				const datum2 = new Date(o.data[1]).setHours(0);

				const prijs = o.prijsPerNachtPerPersoon;

				if (date.getTime() >= datum1 && date.getTime() <= datum2) {
					toeTeVoegen = Number(prijs);
					//speciale prijs gevonden, dus nimr verder zoeken: break
					break;
				}
			}
			totaalArray.push(toeTeVoegen);
			totaal += toeTeVoegen;
		});

		setPrijsBerekening(getPrijsBerFromArr(totaalArray));

		setPrijsVerblijf(fixprijs(totaal));
		totaal +=
			eenMaligeBijkomendeKostTotaal +
			aantalNachten * perNachtBijkomendeKost1Nacht;

		const temptot = fixprijs(totaal + serviceKost + Number(waarborg));

		//korting berekenen
		//als t aantal dagen >= 30 dan (evt) maandkorting
		if (maandKortingPercent && aantalNachten >= 29) {
			//29 cuz wij doen nachten
			//mss maandkorting
			// console.log('yeetmaand', (maandKortingPercent / 100) * temptot);
			const temp = fixprijs((maandKortingPercent / 100) * temptot);
			setKorting(temp);
		}
		//anders zien naar t aantal nachten en dan (evt) kortingpercent (aantalnachten)
		else if (kortingNachten && aantalNachten >= kortingNachten) {
			//kortingpercent
			// console.log('yeetdag', (kortingPercent / 100) * temptot);
			const temp = fixprijs((kortingPercent / 100) * temptot);
			setKorting(temp);
		} else {
			setKorting(0);
		}

		//prijs wordt dan som van al de prijzen per dag + servicekost
		setPrijsVoorKorting(temptot);
		setTotaalPrijs(fixprijs(temptot - korting));
	}, [
		gasten,
		prijsPerNachtPerPersoon,
		aantalNachten,
		datums,
		prijsAanpassing,
		kortingNachten,
		kortingPercent,
		maandKortingPercent,
		korting,
		eenMaligeBijkomendeKostTotaal,
		perNachtBijkomendeKost1Nacht,
		waarborg,
	]);

	const handleStartBoeken = useCallback(async () => {
		if (!datums[0] || !datums[1]) {
			alert('Gelieve een aankomst en vertrek datum in te voeren');
			return;
		}
		if (aantalNachten < woning.minimumAantalNachtenVerblijf) {
			alert(
				`Gelieve ten minste ${woning.minimumAantalNachtenVerblijf} nachten te boeken`
			);
			return;
		}
		boekingDetails.datumAankomst = datums[0];
		boekingDetails.datumVertrek = datums[1];
		boekingDetails.aantalGasten = gasten;
		boekingDetails.reisPrijs = totaalPrijs;
		boekingDetails.verzekeringprijs = 0;
		boekingDetails.betaalmethode = null;
		boekingDetails.verzekering = null;
		boekingDetails.woningID = woning.woningID;
		boekingDetails.naamWoning = woning.naamWoning;
		boekingDetails.aantalNachten = aantalNachten;
		setCanRedirect(true);
	}, [boekingDetails, datums, gasten, totaalPrijs, woning, aantalNachten]);

	return (
		<section
			id='startBoeken'
			className='scroll-mt-56 mt-6 mx-auto 2xl:px-20 px-6 pb-6 border-b-4 border-weboranje'>
			<div className='flex justify-between'>
				<div>
					<DateRangeBoeking
						value={datums}
						setValue={setDatums}
						woningID={woning.woningID}
					/>
				</div>
				<div className='flex flex-col border-2 rounded-lg max-w-[500px] min-w-[430px] ml-2 shadow-[4px_4px_10px_rgba(0,0,0,0.25)]'>
					<p className='font-semibold px-3 pt-3 mr-auto'>
						{t('informatieWoning.booking.standaard')} €
						{prijsPerNachtPerPersoon} /{' '}
						{t('informatieWoning.booking.nacht')}
					</p>
					<p className='text-xs font-semibold pl-3'>
						<AiFillStar size='20' className='pr-1 inline' />
						{rating} - {regio}
					</p>
					<div className='flex mt-1 justify-between'>
						<BoekingStartenData
							datums={datums}
							handleAantalGasten={handleAantalGasten}
							aantalNachten={aantalNachten}
							maxAantalPersonen={maxAantalPersonen}
						/>
						<div className='flex flex-col mr-2 w-2/3'>
							<BoekingStartenPrijsBerekening
								prijsPerNachtPerPersoon={
									prijsPerNachtPerPersoon
								}
								prijsBerekening={prijsBerekening}
								bijkomendeKosten={bijkomendeKosten}
								totaalBijkomend={
									eenMaligeBijkomendeKostTotaal +
									perNachtBijkomendeKost1Nacht * aantalNachten
								}
								prijsVoorKorting={prijsVoorKorting}
								serviceKost={serviceKost}
								korting={korting}
								totaalPrijs={totaalPrijs}
								waarborg={waarborg}
								prijsVerblijf={prijsVerblijf}
								aantalNachten={aantalNachten}
							/>
							<button
								className='mx-auto mt-auto mb-2 p-2 text-white bg-weboranje rounded-lg'
								onClick={handleStartBoeken}>
								Boek deze woning
							</button>
							{canRedirect && <Navigate to={`/boeken/${id}`} />}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
