import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';

export default function StandaardInfoVoorzieningenTags(props) {
	const { register } = props;

	const { currentInfoWoning } = useContext(CurrentWoningContext);
	const  {t} = useTranslation();
	return (
		<div className='flex justify-between'>
			<div className='flex flex-col gap-y-1 w-[48%]'>
				<p>{t('adv.1.voorz')}</p>
				<div className='flex flex-col border-2 rounded-md p-1'>
					<div>
						<input
							type='checkbox'
							id='wifiAddAd'
							{...register('wifi')}
							defaultChecked={currentInfoWoning?.wifi}
						/>
						<label htmlFor='wifiAddAd' className='pl-2'>
							{t('advertentiepagina.filters.subtitle1.wifi')}
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='zwembadAddAd'
							{...register('zwembad')}
							defaultChecked={currentInfoWoning?.zwembad}
						/>
						<label htmlFor='zwembadAddAd' className='pl-2'>
						{t('advertentiepagina.filters.subtitle1.zwembad')}
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='zeezichtAddAd'
							{...register('zeezicht')}
							defaultChecked={currentInfoWoning?.zeezicht}
						/>
						<label htmlFor='zeezichtAddAd' className='pl-2'>
						{t('advertentiepagina.filters.subtitle1.zeezicht')}
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='aircoAddAd'
							{...register('airco')}
							defaultChecked={currentInfoWoning?.airco}
						/>
						<label htmlFor='aircoAddAd' className='pl-2'>
						{t('advertentiepagina.filters.subtitle1.airco')}
						</label>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-y-1 w-[48%]'>
				<p>{t('adv.1.tags')}</p>
				<div className='flex flex-col border-2 rounded-md p-1 overflow-hidden'>
					<div>
						<input
							type='checkbox'
							id='avontuurAddAd'
							{...register('avontuur')}
							defaultChecked={currentInfoWoning?.avontuur}
						/>
						<label htmlFor='avontuurAddAd' className='pl-2'>
						{t('advertentiepagina.filters.subtitle3.avontuur')}
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='reizenAddAd'
							{...register('reizen')}
							defaultChecked={currentInfoWoning?.reizen}
						/>
						<label htmlFor='reizenAddAd' className='pl-2'>
						{t('advertentiepagina.filters.subtitle3.reizen')}
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='culinairAddAd'
							{...register('culinair')}
							defaultChecked={currentInfoWoning?.culinair}
						/>
						<label htmlFor='culinairAddAd' className='pl-2'>
						{t('advertentiepagina.filters.subtitle3.culinair')}
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='ontspanningAddAd'
							{...register('ontspanning')}
							defaultChecked={currentInfoWoning?.ontspanning}
						/>
						<label htmlFor='ontspanningAddAd' className='pl-2'>
						{t('advertentiepagina.filters.subtitle3.ontspanning')}
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='sportenAddAd'
							{...register('sporten')}
							defaultChecked={currentInfoWoning?.sporten}
						/>
						<label htmlFor='sportenAddAd' className='pl-2'>
						{t('advertentiepagina.filters.subtitle3.sporten')}
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
