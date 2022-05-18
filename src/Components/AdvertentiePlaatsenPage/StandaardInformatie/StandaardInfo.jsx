import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import StandaardInfoVelden from './StandaardInfoVelden';
import TitelStapAdvertentiePlaatsen from '../TitelStapAdvertentiePlaatsen';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function StandaardInfo(props) {
	const { handleNext, setActivePage, stepsButton, handleBack } = props;
	const {t} = useTranslation();
	const { currentInfoWoning } = useContext(CurrentWoningContext);

	//display images
	const [images, setImages] = useState(currentInfoWoning.images ?? []);
	const [imageURLs, setImageURLs] = useState(
		currentInfoWoning?.linkAfbeeldingen || []
	);

	useEffect(() => {
		if (images.length < 1) return;
		const newImageUrls = [];
		images.forEach((image) =>
			newImageUrls.push(URL.createObjectURL(image))
		);
		setImageURLs(newImageUrls);
		currentInfoWoning.linkAfbeeldingen = newImageUrls;
	}, [images, currentInfoWoning]);

	const { register, handleSubmit } = useForm();

	const submit = useCallback(
		(data) => {
			if (!currentInfoWoning.regioNaam) {
				currentInfoWoning.regioNaam = 'Andalusië';
			}

			const arr = Object.entries(data);
			arr.forEach((pair) => {
				let pair0 = pair[0];
				let pair1 = pair[1];
				//true/false -> 1/0
				if (pair1 === true) pair1 = 1;
				if (pair1 === false) pair1 = 0;

				currentInfoWoning[pair0] = pair1;
			});

			currentInfoWoning.linkAfbeeldingen = imageURLs;

			currentInfoWoning.adres = {
				straat: data.straat,
				nummer: data.nr,
				postcode: data.postcode,
			};

			currentInfoWoning.images = images;

			handleNext();
		},
		[currentInfoWoning, imageURLs, images, handleNext]
	);

	return (
		<section className='flex flex-col justify-center mt-10 max-w-2xl mx-auto text-webgrijs font-semibold mb-20'>
			<form onSubmit={handleSubmit(submit)}>
				<div className='border-[1px] border-weboranje rounded-xl min-w-[600px] max-w-2xl mx-4 px-4'>
					<TitelStapAdvertentiePlaatsen
						icon='standaard'
						tekst={t('adv.btn1')}
					/>
					<StandaardInfoVelden
						register={register}
						setImages={setImages}
						imageURLs={imageURLs}
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
						<input
							type='submit'
							className='bg-weboranje text-white font-bold rounded-lg text-lg p-3 disabled:bg-weblichtgrijs cursor-pointer'
							value={'Naar datum & beschikbaarheden >'}
						/>
					</Box>
				</div>
			</form>
		</section>
	);
}
