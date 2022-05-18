import { useTranslation } from 'react-i18next';
import { DateToText } from '../../../core/dateFns';
import BoekingStartenDataDiv from './BoekingStartenDataDiv';

export default function BoekingStartenData(props) {
	const { datums, handleAantalGasten, aantalNachten, maxAantalPersonen } =
		props;
	const {t} = useTranslation();

	return (
		<div className='flex flex-col h-fit p-[1px] m-3 border-2 border-gray-300 rounded-md bg-gray-200 shadow-[4px_4px_10px_rgba(0,0,0,0.25)]'>
			<BoekingStartenDataDiv
				label={`${t('advertentiepagina.aantalNachten')}:`}
				value={aantalNachten}
			/>
			<BoekingStartenDataDiv
				label={`${t('advertentiepagina.aankomst')}:`}
				value={DateToText(datums[0])}
			/>
			<BoekingStartenDataDiv
				label={`${t('advertentiepagina.vertrek')}:`}
				value={DateToText(datums[1])}
			/>

			<label className='flex p-1 gap-x-2'>
				{t('advertentiepagina.gasten')}:
				<input
					type='number'
					className='p-1 ml-auto w-14 bg-inherit border-[1px] border-gray-300 rounded-md'
					min={1}
					max={maxAantalPersonen}
					defaultValue={localStorage.getItem('Persons')?localStorage.getItem('Persons')> maxAantalPersonen?maxAantalPersonen:localStorage.getItem('Persons')< 1?1:localStorage.getItem('Persons'):1}
					onChange={handleAantalGasten}
				/>
			</label>
			<p className='text-xs ml-2 mb-1'>{t('advertentiepagina.maxGasten')}: {maxAantalPersonen}</p>

		</div>
	);
}
