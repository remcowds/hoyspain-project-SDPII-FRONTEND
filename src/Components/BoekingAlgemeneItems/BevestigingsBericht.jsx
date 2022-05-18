import afbeelding from '../../Images/Booking/Picture3.jpg';
import Boogjes from '../../Components/Landingspage/Boogjes';
import { BookingContext } from '../../contexts/BookingProvider';
import { useCallback, useContext } from 'react';
import { useSession } from '../../contexts/AuthProvider';
import BoogjeRotated from '../../Images/Booking/rotated-boogje.svg';
import BoogjeRotated2 from '../../Images/Booking/rotated-boogje2.svg';
import { useTranslation } from 'react-i18next';

export default function BevestigingsBericht() {
	const { boekingDetails, getBookingDetail } = useContext(BookingContext);
	const { user, isAuthed } = useSession();
	const { t } = useTranslation();

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

	const displayBoekingsnummer = (nr) => {
		return nr.toLocaleString('en-US', {
			minimumIntegerDigits: 5,
			useGrouping: false,
		});
	};

	return (
		<>
			<div className='w-full flex flex-row justify-between absolute -z-10'>
				<div
					className='w-[75px] h-[950px]'
					style={{ backgroundImage: `url(${BoogjeRotated})` }}></div>
				<div
					className='w-[75px] h-[950px]'
					style={{ backgroundImage: `url(${BoogjeRotated2})` }}></div>
			</div>

			<div className='flex flex-col mt-10 gap-7 items-center max-w-7xl mx-auto'>
				<div
					className='text-6xl font-bold text-weboranje mt-6'
					id='bedankingboeking'>
					{t('boeken.bedanking.titel')}
				</div>
				<img src={afbeelding} className='' draggable='false' alt='no' />
				<div className='text-3xl font-bold text-webgrijs'>
					{t('boeken.bedanking.subtitel')}
				</div>

				<div className='text-md text-webgrijs font-semibold px-48 m-8'>
					<p className='mb-4'>
						{t('boeken.bedanking.tekst1')}{' '}
						{numberToDay(boekingDetails.datumAankomst.getDay())}{' '}
						{boekingDetails.datumAankomst.getDate()}{' '}
						{numberToMonth(boekingDetails.datumAankomst)}{' '}
						{boekingDetails.datumAankomst.getFullYear()}{' '}
						{t('boeken.bedanking.tekst2')} '
						{boekingDetails.naamWoning}'.
					</p>
					<p className='mb-4'>
						{t('boeken.bedanking.tekst3')}
						{displayBoekingsnummer(
							boekingDetails.gelukt.boeking.boekingsnummer
						)}
						. {t('boeken.bedanking.tekst4')}
					</p>
					<p className='mb-14'>
						{t('boeken.bedanking.tekst5')} {user.emailAdres}{' '}
						{t('boeken.bedanking.tekst6')}
					</p>
					<p className='mb-4'>{t('boeken.bedanking.tekst7')}</p>
					<p className='mb-4'>
						{t('boeken.bedanking.email')}:{' '}
						{boekingDetails.gelukt.verhuurder.emailAdres}
					</p>
					<p className='mb-4'>
						{t('boeken.bedanking.tel')}:{' '}
						{boekingDetails.gelukt.verhuurder.telefoonnummer}
					</p>
					<p className='text-lg font-bold text-weboranje'>
						{t('boeken.bedanking.slotzin')}
					</p>
				</div>
			</div>
		</>
	);
}
