import { ClickAwayListener, Hidden } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../../contexts/AuthProvider';
import { useBooking } from '../../contexts/BookingMainProvider';
import { BookingContext } from '../../contexts/BookingProvider';
import { useTranslation } from 'react-i18next';

import { v4 as uuid } from 'uuid';
import { formatDateYMD } from '../../core/dateFns';

export default function GegevensKaart() {
	const [name, setName] = useState();
	const [nummer, setNummer] = useState();
	const [month, setMonth] = useState();
	const [year, setYear] = useState();
	const [ccv, setCCV] = useState();
	const [front, setFront] = useState();
	const [back, setBack] = useState('hidden');

	const { t } = useTranslation();
	const { boekingDetails, getBookingDetail } = useContext(BookingContext);
	const { user, isAuthed } = useSession();

	const { createBooking } = useBooking();

	function klikop() {
		setFront('hidden');
		setBack('visable');
	}

	function klikuit() {
		setFront('visable');
		setBack('hidden');
	}

	const history = useNavigate();

	const onSubmit = useCallback(async () => {
		try {
			const temp = await createBooking({
				boekingsID: uuid(),
				userID: user.userID,
				woningID: boekingDetails.woningID,
				datumAankomst: formatDateYMD(boekingDetails.datumAankomst),
				datumVertrek: formatDateYMD(boekingDetails.datumVertrek),
				aantalPersonenBoeking: boekingDetails.aantalGasten,
				verzekering: boekingDetails.verzekering,
				reisPrijs: boekingDetails.reisPrijs,
				aantalNachten: boekingDetails.aantalNachten,
				verzekeringsprijs: boekingDetails.verzekeringsprijs,
				totaalPrijs: boekingDetails.totaalPrijs,
			});
			boekingDetails.gelukt = {
				verhuurder: {
					emailAdres: temp.data.verhuurder.emailAdres,
					telefoonnummer: temp.data.verhuurder.telefoonnummer,
				},
				boeking: {
					boekingsnummer: temp.data.boeking.boekingsnummer,
				},
			};
			history('/boeken/bevestiging');
		} catch (error) {
			//data ondertussen niet meer beschikbaar
			if (error.response.data.message.includes('niet beschikbaar')) {
				alert('De geselecteerde data zijn niet meer beschikbaar!');
			} else {
				//andere error bij boeken
				alert('Er ging iets fout, probeer later opnieuw.');
			}
			history(`/huren/${boekingDetails.woningID}`, {
				replace: true,
			});
		}
	}, [createBooking, boekingDetails, user.userID, history]);

	return (
		<>
			<div className='m-4'>
				<div
					className='credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white'
					x-data='creditCard'>
					<header className='flex flex-col justify-center items-center'>
						<div className={`relative + ${front}`}>
							<img
								className='w-full h-auto'
								src='https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png'
								alt='front credit card'
							/>
							<div className='front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12'>
								<p
									className='number mb-5 sm:text-xl'
									x-text="cardNumber !== '' ? cardNumber : '0000 0000 0000 0000'">
									{name}
								</p>
								<div className='flex flex-row justify-between'>
									<p>{nummer}</p>
									<div className=''>
										<span x-text='expired.month'>
											{month}
										</span>
										<span x-show="expired.month !== ''">
											/
										</span>
										<span x-text='expired.year'>
											{year}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className={`relative + ${back}`}>
							<img
								className='w-full h-auto'
								src='https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-back.png'
								alt=''
							/>
							<div className='bg-transparent text-white text-xl w-full flex justify-end absolute bottom-20 px-8  sm:bottom-24 right-0 sm:px-12'>
								<div className='border border-white w-16 h-9 flex justify-center items-center'>
									<p>{ccv}</p>
								</div>
							</div>
						</div>
					</header>
					<main className='mt-4 p-4'>
						<h1 className='text-xl font-semibold text-gray-700 text-center'>
							{t('boeken.betaling.invullen')}
						</h1>
						<div className=''>
							<div className='my-3'>
								<input
									type='text'
									className='block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
									placeholder={t('boeken.betaling.naam')}
									maxLength='22'
									onChange={(e) => setName(e.target.value)}
									onClick={(e) => klikuit()}
								/>
							</div>
							<div className='my-3'>
								<input
									type='text'
									className='block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
									placeholder={t('boeken.betaling.nummer')}
									maxlength='19'
									onChange={(e) => setNummer(e.target.value)}
									onClick={(e) => klikuit()}
								/>
							</div>
							<div className='my-3 flex flex-col'>
								<div className='mb-2'>
									<label for='' className='text-gray-700'>
										{t('boeken.betaling.vervalt')}
									</label>
								</div>
								<div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
									<select
										className='form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
										x-model='expired.month'
										onChange={(e) =>
											setMonth(e.target.value)
										}
										onClick={(e) => klikuit()}
										defaultValue='k'>
										<option value='k' selected disabled>
											MM
										</option>
										<option value='01'>01</option>
										<option value='02'>02</option>
										<option value='03'>03</option>
										<option value='04'>04</option>
										<option value='05'>05</option>
										<option value='06'>06</option>
										<option value='07'>07</option>
										<option value='08'>08</option>
										<option value='09'>09</option>
										<option value='10'>10</option>
										<option value='11'>11</option>
										<option value='12'>12</option>
									</select>
									<select
										name=''
										id=''
										className='form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
										onChange={(e) =>
											setYear(e.target.value)
										}
										onClick={(e) => klikuit()}>
										<option value='' selected disabled>
											YY
										</option>
										<option value='2021'>2021</option>
										<option value='2022'>2022</option>
										<option value='2023'>2023</option>
										<option value='2024'>2024</option>
										<option value='2025'>2025</option>
										<option value='2026'>2026</option>
									</select>

									<input
										type='text'
										className='  col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
										placeholder={t('boeken.betaling.code')}
										maxlength='3'
										onMouseUp={(e) => klikop()}
										onChange={(e) => setCCV(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</main>
					<footer className='mt-6 p-4 mx-auto'>
						<div
							className='text-white cursor-pointer px-4 py-3 w-full bg-weboranje rounded-full focus:ring focus:outline-none  text-xl font-semibold transition-colors text-center'
							onClick={onSubmit}>
							{t('boeken.betaling.betaal')}
						</div>
					</footer>
				</div>
			</div>
		</>
	);
}
