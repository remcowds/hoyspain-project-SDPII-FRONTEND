import { useTranslation } from 'react-i18next';
import GeefSterren from './GeefSterren';

export default function Rating(props) {
	const { register } = props;
	const {t} = useTranslation();
	return (
		<>
			<p className='text-base p-1 border-gray-300 font-semibold'>
			{t('advertentiepagina.filters.subtitle4.title')}
			</p>

			
			<div className='flex items-center ml-1'>
				<input
					type='checkbox'
					id='5Ster'
					name='5Ster'
					value={'5Ster'}
					{...register('vijfSter')}
				/>
				<label
					htmlFor='vijfSter'
					className='flex items-center pl-2 text-sm'>
					<GeefSterren aantal={5} /> {t('advertentiepagina.filters.rating.5')}
				</label>
			</div>
			<div className='flex items-center ml-1'>
				<input
					type='checkbox'
					id='4Ster'
					name='4Ster'
					value={'4Ster'}
					{...register('vierSter')}
				/>
				<label
					htmlFor='vierSter'
					className='flex items-center pl-2 text-sm'>
					<GeefSterren aantal={4} />
					{t('advertentiepagina.filters.rating.4')}
				</label>
			</div>
			<div className='flex items-center ml-1'>
				<input
					type='checkbox'
					id='3Ster'
					name='3Ster'
					value={'3Ster'}
					{...register('drieSter')}
				/>
				<label
					htmlFor='drieSter'
					className='flex items-center pl-2 text-sm'>
					<GeefSterren aantal={3} />
					{t('advertentiepagina.filters.rating.3')}
				</label>
			</div>
			<div className='flex items-center ml-1'>
				<input
					type='checkbox'
					id='2Ster'
					name='2Ster'
					value={'2Ster'}
					{...register('tweeSter')}
				/>
				<label
					htmlFor='tweeSter'
					className='flex items-center pl-2 text-sm'>
					<GeefSterren aantal={2} />
					{t('advertentiepagina.filters.rating.2')}
				</label>
			</div>
			<div className='flex items-center ml-1'>
				<input
					type='checkbox'
					id='0Ster'
					name='0Ster'
					value={'0Ster'}
					{...register('geenSter')}
				/>
				<label htmlFor='geenSter' className='pl-2 text-sm'>
				{t('advertentiepagina.filters.rating.0')}
				</label>
			</div>
		</>
	);
}
