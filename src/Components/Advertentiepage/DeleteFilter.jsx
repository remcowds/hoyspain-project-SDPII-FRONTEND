import { useCallback, useContext } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai/';
import { WoningContext } from '../../contexts/WoningProvider';

export default function DeleteFilter(props) {
	const { filterName, filterValue, filters, setFilters } = props;

	const { GETWoningen } = useContext(WoningContext);

	const handleDelete = useCallback(() => {
		const temp = filters;
		delete temp[filterName];
		setFilters(temp);
		document.getElementById('sorteren').value = '';
		GETWoningen(temp);
	}, [GETWoningen, filterName, filters, setFilters]);

	return (
		<div className='flex bg-gray-100 rounded-md mb-[6px] mr-[6px]'>
			<p className='p-1'>
				{filterName}
				{filterName.includes('Prijs') ? `: ${filterValue}` : null}
			</p>
			<button onClick={handleDelete}>
				<AiOutlineCloseCircle size={24} className='pr-1' />
			</button>
		</div>
	);
}
