import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import StandaardInfoLinkederDeel from './StandaardInfoLinkederDeel';
import StandaardInfoRechterDeel from './StandaardInfoRechterDeel';

export default function StandaardInfoVelden(props) {
	const { register, setImages, imageURLs } = props;

	const { currentInfoWoning } = useContext(CurrentWoningContext);

	const onImageChange = (e) => {
		setImages([...e.target.files]);
	};
	const {t} = useTranslation();
	return (
		<>
			<div className='flex justify-between mb-4'>
				<StandaardInfoLinkederDeel
					register={register}
				/>
				<StandaardInfoRechterDeel
					register={register}
					onImageChange={onImageChange}
					imageURLs={imageURLs}
				/>
			</div>
			<div className='flex flex-col gap-y-1 mb-4'>
				<label>{t('adv.1.ext')}*</label>
				<textarea
					required
					name='beschrijving'
					id='beschrijving'
					rows='10'
					placeholder={t('adv.1.extpl')}
					className='border-2 rounded-md w-full p-[2px] resize-none'
					{...register('beschrijving')}
					defaultValue={currentInfoWoning?.beschrijving}
				/>
			</div>
		</>
	);
}
