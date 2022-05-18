import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { WoningContext } from '../../contexts/WoningProvider';

export default function DropdownSorteren(props) {
	const { filters } = props;
	const {t} = useTranslation();
	const { GETWoningen } = useContext(WoningContext);

	const updateContext = useCallback(
		(e) => {
			const temp = { ...filters };

			temp.orderBy = e.target.value;

			GETWoningen(temp);
		},
		[filters, GETWoningen]
	);

	return (
		<div className='self-end  ml-auto mb-auto mr-2 '>
			<select
				name='sorteren'
				id='sorteren'
				className='border-solid border-2 border-gray-200 rounded-md p-1 mr-auto '
				onChange={updateContext}
				defaultValue=''>
				<option value='' disabled className='text-black/30'>
					{t('advertentiepagina.overview.sorteer')}
				</option>
				<option key='Popular' value='Populair'>
					⭐{t('advertentiepagina.overview.populair')}
				</option>
				<option key='prijsDalend' value='prijsDalend'>
					⬇️{t('advertentiepagina.overview.prijsdalend')}
				</option>
				<option key='prijsStijgend' value='prijsStijgend'>
					⬆️{t('advertentiepagina.overview.prijsstijgend')}
				</option>
			</select>
		</div>
	);
}
