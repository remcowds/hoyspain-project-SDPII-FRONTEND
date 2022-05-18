import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { BiMap } from 'react-icons/bi';
import GeefSterren from '../Advertentiepage/GeefSterren';
import { MdLuggage } from 'react-icons/md';
import { BookingContext } from '../../contexts/BookingProvider';
import { useTranslation } from 'react-i18next';

const KaartjeOverzicht = (props) => {
	const { boekingDetails, getBookingDetail } = useContext(BookingContext);
	const [verzekeringKost, setVerzekeringKost] = useState(0);
	const { t } = useTranslation();

	useEffect(() => {
		setVerzekeringKost(getBookingDetail('verzekeringprijs'));

		boekingDetails.totaalPrijs = Number(
			parseFloat(props.prijs) +
				parseFloat(verzekeringKost === null ? 0 : verzekeringKost)
		).toFixed(2);
	}, [boekingDetails]);

	const numberToDay = useCallback(
		(number) => {
			switch (number) {
				case 0:
					return `${t('kaart.zondag')}`;
				case 1:
					return `${t('kaart.maandag')}`;
				case 2:
					return `${t('kaart.dinsdag')}`;
				case 3:
					return `${t('kaart.woensdag')}`;
				case 4:
					return `${t('kaart.donderdag')}`;
				case 5:
					return `${t('kaart.vrijdag')}`;
				case 6:
					return `${t('kaart.zaterdag')}`;
				default:
					break;
			}
		},
		[t]
	);

	const numberToMonth = useCallback(
		(datum) => {
			const monthNamelist = [
				t('kaart.januari'),
				t('kaart.februari'),
				t('kaart.maart'),
				t('kaart.april'),
				t('kaart.mei'),
				t('kaart.juni'),
				t('kaart.juli'),
				t('kaart.augustus'),
				t('kaart.september'),
				t('kaart.oktober'),
				t('kaart.november'),
				t('kaart.december'),
			];
			return monthNamelist[datum.getMonth()];
		},
		[t]
	);

	return (
		<div
			className={`mx-8 mr-40 mt-10 bg-webwit  rounded-xl shadow-md shadow-gray-400 ${props.extra} max-h-[900px]`}>
			<div className='md:h-72 md:w-auto relative '>
				<img
					src={props.img}
					alt='house'
					draggable='false'
					className='w-full h-full rounded-2xl object-cover group-hover:opacity-0 duration-500'
				/>
				<img
					src={props.img2}
					alt='house'
					draggable='false'
					className='absolute top-0 w-full h-full rounded-2xl object-cover opacity-0 group-hover:opacity-100 duration-500'
				/>
			</div>
			<div className='p-6'>
				<GeefSterren aantal={props.aantalSterren} extragrootte='40' />
			</div>
			<div className='pl-6'>
				<h3 className='font-semibold ml-1 text-3xl text-left my-2'>
					{props.name}
				</h3>
				<div className='flex flex-row justify-start'>
					<BiMap
						className='text-weboranje p-1 rounded-full bg-weblichtoranje'
						size='29'
					/>
					<p className='text-lg pl-1 text-webgrijs'>{props.regio}</p>
				</div>
			</div>
			<div className='flex justify-between text-lg mx-2 pl-6'>
				<div className='text-2xl md:text-3xl'>
					<br />
					{/* <p>{props.icons}</p> */}
				</div>
			</div>
			<div className='text-xl mx-2 pl-6 pt-6 font-bold'>
				<div className='text-webgrijs text-center text-2xl'>
					{numberToDay(boekingDetails.datumAankomst.getDay()).replace(/^\w/, (c) => c.toUpperCase())},{' '}
					{boekingDetails.datumAankomst.getDate()}{' '}
					{numberToMonth(boekingDetails.datumAankomst)}{' '}
					{boekingDetails.datumAankomst.getFullYear()}
					<br/>
					<p className=''>{t("adv.2.tot").toLocaleLowerCase()}
					</p>
					{numberToDay(boekingDetails.datumVertrek.getDay()).replace(/^\w/, (c) => c.toUpperCase())},{' '}
					{boekingDetails.datumVertrek.getDate()}{' '}
					{numberToMonth(boekingDetails.datumVertrek)}{' '}
					{boekingDetails.datumVertrek.getFullYear()}
				</div>
					<br />
				<div className='text-weblichtgrijs text-center'>
					{boekingDetails.aantalNachten} {t('kaart.dagen')},{' '}
					{boekingDetails.aantalGasten}{' '}
					{boekingDetails.aantalGasten === 1
						? t('kaart.persoon')
						: t('kaart.persoonen')}
				</div>
			</div>
			<div className='pt-20 xl:text-2xl lg:text-xl font-bold grid grid-flow-row grid-cols-2'>
				<span className='text-weboranje pl-8'>
					{t('kaart.boeking')}
				</span>
				<span className='text-webgrijs ml-auto pr-10'>
					€{props.prijs}
				</span>
				<span className='text-weboranje float-left pl-8'>
					{t('kaart.verzekering')}
				</span>
				<span className='text-webgrijs ml-auto pr-10'>
					€{parseFloat(verzekeringKost).toFixed(2)}
				</span>
				<div className=' mr-10 ml-8 col-span-2 h-1 border-t-[2px] mt-1 border-weboranje' />
				<span className='text-weboranje pl-8 pb-2'>{t('kaart.Totaal')}</span>
				<span className='text-webgrijs ml-auto pr-10 pb-4'>
					€
					{(
						parseFloat(props.prijs) +
						parseFloat(
							verzekeringKost === null ? 0 : verzekeringKost
						)
					).toFixed(2)}
				</span>
			</div>
			{props.verzekering && (
				<>
					<div className=' h-[2px] bg-weblichtgrijs m-6'></div>
					<div className='mx-16'>
						<MdLuggage size='40' className='inline' />
						<span className='text-xl font-bold text-webgrijs'>
							{' '}
							Annuleringsverzekering
						</span>
						<div className='text-weblichtgrijs text-sm ml-12 pb-8'>
							1 x {props.verzekering}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default KaartjeOverzicht;
