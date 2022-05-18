import { Input, InputAdornment } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';

export default function PrijsInstellenKortingMinimum(props) {
	const { register } = props;

	const { currentInfoWoning } = useContext(CurrentWoningContext);
	const {t} = useTranslation();
	return (
		<div className='flex gap-x-8 mb-4'>
			<div className='flex flex-col'>
				<label>{t('adv.3.korting')}*</label>
				<div className='flex gap-x-2'>
					<Input
						inputProps={{ min: 0 }}
						startAdornment={
							<InputAdornment position='start'>%</InputAdornment>
						}
						type='number'
						name='percentKorting'
						id='percentKorting'
						className='border-2 rounded-md w-24 p-[2px] pl-1'
						defaultValue={currentInfoWoning?.kortingPercent}
						{...register('kortingPercent')}
					/>
					<input
						type='number'
						name='aantalDagen'
						id='aantalDagen'
						placeholder={t('adv.3.nachten')}
						className='border-2 rounded-md w-24 p-[2px] pl-1'
						{...register('kortingNachten')}
						defaultValue={currentInfoWoning?.kortingNachten}
					/>
				</div>
			</div>
			<div className='flex flex-col'>
				<label className='whitespace-nowrap'>
				{t('adv.3.min')}
				</label>
				<input
					type='number'
					className='border-2 rounded-md w-24 p-[2px] pl-1 h-full'
					{...register('minimumAantalNachtenVerblijf')}
					defaultValue={
						currentInfoWoning?.minimumAantalNachtenVerblijf
					}
				/>
			</div>
			<div className='flex flex-col'>
				<label>{t('adv.3.maandkorting')}</label>
				<Input
					inputProps={{ min: 0 }}
					startAdornment={
						<InputAdornment position='start'>%</InputAdornment>
					}
					type='number'
					name='maandPercentKorting'
					id='maandPercentKorting'
					className='border-2 rounded-md w-24 p-[2px] pl-1'
					defaultValue={currentInfoWoning?.maandKortingPercent}
					{...register('maandKortingPercent')}
				/>
			</div>
		</div>
	);
}
