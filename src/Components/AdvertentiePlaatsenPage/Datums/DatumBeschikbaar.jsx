import { useCallback, useContext, useState } from 'react';
import DisplayDates from './DisplayDates';
import TitelStapAdvertentiePlaatsen from '../TitelStapAdvertentiePlaatsen';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function DatumBeschikbaar(props) {
	const { handleNext, setActivePage, handleBack } = props;

	const { currentInfoWoning } = useContext(CurrentWoningContext);

	const [nietBeschikbaar, setNietBeschikbaar] = useState(
		currentInfoWoning?.nietBeschikbaar || []
	);

	const handleSubmit = useCallback(() => {
		currentInfoWoning.nietBeschikbaar = nietBeschikbaar;
	}, [nietBeschikbaar, currentInfoWoning]);

	const goForward = useCallback(() => {
		handleSubmit();
		handleNext();
	}, [handleSubmit, handleNext]);
	const {t} = useTranslation();
	return (
		<section className='flex flex-col justify-center mt-10 max-w-2xl mx-auto text-webgrijs font-semibold mb-20'>
			<div className='border-[1px] border-weboranje rounded-xl min-w-[600px] max-w-2xl mx-4 px-4'>
				<TitelStapAdvertentiePlaatsen
					icon='beschikbaar'
					tekst={t('adv.2.title')}
				/>
				<div className='flex flex-col items-center'>
					<h3 className='text-xl underline'>{t('adv.2.not')}</h3>
					<p className='text-sm'>
					{t('adv.2.notex')}
					</p>
					<DisplayDates
						isPrijsAanpassingPage={false}
						nietBeschikbaar={nietBeschikbaar}
						setNietBeschikbaar={setNietBeschikbaar}
					/>
				</div>
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
						className='bg-weboranje text-white font-bold rounded-lg text-lg p-3 disabled:bg-weblichtgrijs'
						onClick={goForward}>
						{'Naar prijs instellen >'}
					</button>
				</Box>
			</div>
		</section>
	);
}
