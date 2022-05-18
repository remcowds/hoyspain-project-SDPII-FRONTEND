import { Box, Button } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import TitelStapAdvertentiePlaatsen from '../TitelStapAdvertentiePlaatsen';
import PrijsInstellenVelden from './PrijsInstellenVelden';

export default function PrijsInstellen(props) {
	const { handleNext, setActivePage, handleBack } = props;

	const { currentInfoWoning } = useContext(CurrentWoningContext);

	const [extraKosten, setExtraKosten] = useState(
		currentInfoWoning.bijkomendeKosten
			? currentInfoWoning.bijkomendeKosten
			: []
	);

	const { register, handleSubmit } = useForm();

	const submit = useCallback(
		(data) => {
			const arr = Object.entries(data);

			arr.forEach((pair) => {
				currentInfoWoning[pair[0]] = pair[1];
			});

			currentInfoWoning.bijkomendeKosten = extraKosten;

			if (!currentInfoWoning.prijsAanpassing) {
				currentInfoWoning.prijsAanpassing = [];
			}

			handleNext();
		},

		[extraKosten, currentInfoWoning, handleNext]
	);
	const {t} = useTranslation();

	return (
		<section className='flex flex-col justify-center mt-10 max-w-2xl mx-auto text-webgrijs font-semibold mb-20'>
			<form onSubmit={handleSubmit(submit)}>
				<div className='border-[1px] border-weboranje rounded-xl min-w-[600px] max-w-2xl mx-4 px-4'>
					<TitelStapAdvertentiePlaatsen
						icon='prijs'
						tekst={t('adv.3.title')}
					/>
					<PrijsInstellenVelden
						register={register}
						setExtraKosten={setExtraKosten}
						extraKosten={extraKosten}
					/>
				</div>
				<div className=' grid place-items-center m-10'>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Button
							color='inherit'
							disabled={setActivePage === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}>
							{t('adv.previous')}
						</Button>
						<button
							type='submit'
							className='bg-weboranje text-white font-bold rounded-lg text-lg p-3 disabled:bg-weblichtgrijs cursor-pointer'>
							{'Naar preview woning >'}
						</button>
					</Box>
				</div>
			</form>
		</section>
	);
}
