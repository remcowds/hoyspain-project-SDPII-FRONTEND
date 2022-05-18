import BoekingStartenPrijsBerekeningDiv from './BoekingStartenPrijsBerekeningDiv';
import ExtraKostenDivken from './ExtraKostenDivken';
import { AiFillInfoCircle } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import FadeIn from 'react-fade-in';
import { prijs2Decimals } from '../../../core/prijzen';

export default function BoekingStartenPrijsBerekening(props) {
	const {
		prijsVoorKorting,
		prijsVerblijf,
		serviceKost,
		korting,
		totaalPrijs,
		waarborg,
		aantalNachten,
		totaalBijkomend,
		bijkomendeKosten,
		prijsBerekening,
		prijsPerNachtPerPersoon,
	} = props;

	const eenMaligeBijkomendeKosten = bijkomendeKosten.filter(
		(kost) => kost.eenmalig === true
	);

	const perNachtBijkomendeKosten = bijkomendeKosten.filter(
		(kost) => kost.eenmalig === false
	);

	const [showExtraKosten, setShowExtraKosten] = useState(false);
	const toggleShowExtraKosten = useCallback(() => {
		setShowExtraKosten(!showExtraKosten);
		setShowPrijsVerblijf(false);
	}, [showExtraKosten]);

	const [showPrijsVerblijf, setShowPrijsVerblijf] = useState(false);

	const toggleShowPrijsVerblijf = useCallback(() => {
		setShowPrijsVerblijf(!showPrijsVerblijf);
		setShowExtraKosten(false);
	}, [showPrijsVerblijf]);
	return (
		<div className='flex flex-col p-2'>
			<BoekingStartenPrijsBerekeningDiv
				label={'Servicekost:'}
				value={serviceKost}
			/>
			<BoekingStartenPrijsBerekeningDiv
				label={'Waarborg:'}
				value={Number(waarborg)}
			/>
			{/* hier dan totaal met pictogram op apart te zien */}
			<div className='relative flex py-1 border-b-[1px]'>
				<AiFillInfoCircle
					className='text-weboranje my-auto mr-1 cursor-pointer'
					onClick={toggleShowExtraKosten}
				/>
				<p>Extra kosten:</p>
				<p className='ml-auto'>
					{` €${prijs2Decimals(totaalBijkomend)}`}
				</p>
				{showExtraKosten && (
					<div className='absolute top-8 left-0 z-40 p-2 w-[200px] border-2 border-gray-300 rounded-lg bg-gray-100'>
						<FadeIn>
							{/* dit zijn ze apart */}
							<ExtraKostenDivken
								kostenArr={eenMaligeBijkomendeKosten}
							/>
							<ExtraKostenDivken
								kostenArr={perNachtBijkomendeKosten}
								nachten={aantalNachten}
							/>
						</FadeIn>
					</div>
				)}
			</div>
			<div className='relative flex py-1 border-b-[1px]'>
				<AiFillInfoCircle
					className='text-weboranje my-auto mr-1 cursor-pointer'
					onClick={toggleShowPrijsVerblijf}
				/>
				<p>Prijs verblijf: </p>
				<p className='ml-auto'>{`€${prijs2Decimals(prijsVerblijf)}`}</p>
				{showPrijsVerblijf && (
					<div className='absolute top-8 left-0 z-40 p-2 w-[200px] border-2 border-gray-300 rounded-lg bg-gray-100'>
						<FadeIn>
							{/* hier dan divken me de prijsberekening bv €15 x 8 nachten  */}
							{prijsBerekening.length > 0 ? (
								prijsBerekening.map((o) => (
									<p
										key={`${o.prijs}x${o.nachten}`}>{`€${o.prijs} x ${o.nachten} nachten`}</p>
								))
							) : (
								<p>{`€${prijsPerNachtPerPersoon} x 1 nacht`}</p>
							)}
						</FadeIn>
					</div>
				)}
			</div>
			<BoekingStartenPrijsBerekeningDiv
				label={'Totaal: '}
				value={prijsVoorKorting}
			/>
			<BoekingStartenPrijsBerekeningDiv
				label={'Korting: '}
				value={korting}
				neg={true}
				korting={true}
			/>
			<BoekingStartenPrijsBerekeningDiv
				label={'Vanaf: '}
				value={totaalPrijs}
				strong={true}
			/>
		</div>
	);
}
