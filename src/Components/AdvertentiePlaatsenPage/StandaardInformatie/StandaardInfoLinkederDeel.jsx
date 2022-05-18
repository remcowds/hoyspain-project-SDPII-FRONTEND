// import { useCallback, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import StandaardInfoVelden from './StandaardInfoVelden';
// import TitelStapAdvertentiePlaatsen from '../TitelStapAdvertentiePlaatsen';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import StandaardInfoVoorzieningenTags from './StandaardInfoVoorzieningenTags';

export default function StandaardInfoLinkederDeel(props) {
	const { register } = props;

	const { currentInfoWoning } = useContext(CurrentWoningContext);
	const {t} = useTranslation();
	return (
		<div className='flex flex-col gap-y-4 w-[48%]'>
			<div className='flex flex-col gap-y-1'>
				<label>{t('adv.1.name')}*</label>
				<input
					required
					type='text'
					name='naamWoning'
					id='naamWoning'
					className='border-2 rounded-md w-full p-[2px]'
					defaultValue={currentInfoWoning?.naamWoning}
					{...register('naamWoning')}
				/>
			</div>
			<div className='flex'>
				<div className='flex flex-col gap-y-1 w-[46%]'>
					<label>{t('adv.1.gasten')}*</label>
					<input
						required
						type='number'
						name='aantalPersonen'
						id='aantalPersonen'
						min={0}
						className='border-2 rounded-md w-1/2 p-[2px]'
						defaultValue={currentInfoWoning?.aantalPersonen}
						{...register('aantalPersonen')}
					/>
				</div>
				<div className='flex flex-col gap-y-1 w-[50%]'>
					<label>{t('adv.1.opp')}* (m²)</label>
					<input
						required
						type='number'
						name='oppervlakte'
						id='oppervlakte'
						min={0}
						step={0.01}
						className='border-2 rounded-md w-full p-[2px]'
						defaultValue={currentInfoWoning?.oppervlakte}
						{...register('oppervlakte')}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-y-1'>
				<label>{t('adv.1.shortdescr')}*</label>
				<textarea
					required
					name='korteBeschrijving'
					id='korteBeschrijving'
					rows='2'
					placeholder='Bv: mooie villa te Mallorca'
					className='border-2 rounded-md w-full p-[2px] resize-none'
					defaultValue={currentInfoWoning?.korteBeschrijving}
					{...register('korteBeschrijving')}
				/>
			</div>
			<StandaardInfoVoorzieningenTags
				register={register}
			/>
		</div>
	);
}
