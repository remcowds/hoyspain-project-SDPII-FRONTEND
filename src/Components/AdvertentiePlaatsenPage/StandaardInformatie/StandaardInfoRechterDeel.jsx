import { useCallback, useContext, useEffect, useState } from 'react';
import StandaardInfoImageDiv from './StandaardInfoImageDiv';
import { GETRegios } from '../../../API/regio';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import { useTranslation } from 'react-i18next';

export default function StandaardInfoRechterDeel(props) {
	const { register, onImageChange, imageURLs } = props;

	const { currentInfoWoning } = useContext(CurrentWoningContext);

	const [currSelected, setCurrSelected] = useState(
		currentInfoWoning.regioNaam || 'Andalusië'
	);

	const handleSelectRegio = useCallback(
		(e) => {
			currentInfoWoning.regioNaam = e.target.value;
			setCurrSelected(e.target.value);
		},
		[currentInfoWoning, setCurrSelected]
	);
	const {t} = useTranslation();
	const [regios, setRegios] = useState([]);
	useEffect(() => {
		const get = async () => {
			setRegios(await (await GETRegios()).data.data);
		};
		get();
	}, []);

	return (
		<div className='flex flex-col gap-y-4 w-[48%]'>
			<div className='flex gap-x-2'>
				<div className='flex flex-col gap-y-1 w-full'>
					<label>{t('adv.1.straat')}*</label>
					<input
						required
						type='text'
						name='straat'
						id='straat'
						className='border-2 rounded-md w-full p-[2px]'
						{...register('straat')}
						defaultValue={currentInfoWoning.adres?.straat}
					/>
				</div>
				<div className='flex flex-col gap-y-1 w-[45%]'>
					<label>{t('adv.1.nr')}*</label>
					<input
						required
						type='number'
						name='nr'
						id='nr'
						className='border-2 rounded-md w-full p-[2px]'
						{...register('nr')}
						defaultValue={currentInfoWoning.adres?.nummer}
					/>
				</div>
			</div>
			<div className='flex gap-x-2'>
				<div className='flex flex-col gap-y-1 w-full'>
					<label>{t('adv.1.regio')}*</label>
					<select
						name='regio'
						id='regio'
						className='border-2 rounded-md w-full p-[2px]'
						onChange={handleSelectRegio}
						value={currSelected}>
						{regios.map((regio) => (
							<option value={regio.regio} key={regio.regio}>
								{regio.regio}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-col gap-y-1 w-[45%]'>
					<label>{t('adv.1.post')}*</label>
					<input
						required
						type='number'
						name='postcode'
						id='postcode'
						className='border-2 rounded-md w-full p-[2px]'
						{...register('postcode')}
						defaultValue={currentInfoWoning.adres?.postcode}
					/>
				</div>
			</div>
			<StandaardInfoImageDiv
				onImageChange={onImageChange}
				imageURLs={imageURLs}
			/>
		</div>
	);
}
