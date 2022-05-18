import { useContext } from 'react';
import DeleteFilter from './DeleteFilter';
import DropdownSorteren from './DropdownSorteren';
import InfoChecks from './InfoChecks';
import { WoningContext } from '../../contexts/WoningProvider';
import LijstWoningen from './LijstWoningen';
import DeForm from '../Global Components/DeForm/DeForm';
import { useTranslation } from 'react-i18next';

export default function OverzichtWoningen(props) {
	const { filters, setFilters } = props;
	const {t} = useTranslation();
	const { WONING_DATA, GETWoningen } = useContext(WoningContext);

	const handleDeleteAllFilters = () => {
		setFilters([]);
		//sorteren ook resetten
		document.getElementById('sorteren').value = '';
		GETWoningen();
	};

	const aantalAanbiedingen = `${WONING_DATA.length} ${t('advertentiepagina.overview.house')}${
		WONING_DATA.length !== 1 ? 's' : ''
	} ${t('advertentiepagina.overview.found')}`;

	let filterArray = Object.entries(filters);
	filterArray = filterArray.filter((el) => {
		const magniet = ['regio', 'datumVan', 'datumTot', 'aantalPersonen'];
		return !magniet.includes(el[0]);
	});

	return (
		<div>
			<DeForm
				classNameProp={
					'relative flex flex-col bg-slate-100 bg-opacity-80 rounded-xl p-5 w-[690px] justify-around mx-auto mt-10 mb-8'
				}
			/>
			<div>
				<InfoChecks />
				{/* <div className='flex mb-1'>
					<h3 className='font-bold text-webgrijs text-lg'><span className='text-weboranje'>{aantalAanbiedingen}</span></h3>
				</div> */}
				<div className='flex items-center mb-4 '>
				<h3 className='font-bold text-webgrijs text-lg'>{aantalAanbiedingen}</h3>
					<div className='flex flex-wrap items-center'>
						{filterArray.map((filter) => (
							<DeleteFilter
								key={filter}
								filterName={filter[0]}
								filterValue={filter[1]}
								filters={filters}
								setFilters={setFilters}
							/>
						))}
					</div>
					{filterArray.length > 0 ? (
						<button
							id='buttonDeleteAllFilters'
							className='ml-auto mr-6 mb-auto pl-1 pt-1 whitespace-nowrap'
							onClick={handleDeleteAllFilters}>
							{t('advertentiepagina.overview.removefilters')}
						</button>
					) : null}
					<DropdownSorteren
						filters={filters}
						setFilters={setFilters}
					/>
				</div>
				<LijstWoningen WONING_DATA={WONING_DATA} itemsPerPage={10} />
			</div>
		</div>
	);
}
