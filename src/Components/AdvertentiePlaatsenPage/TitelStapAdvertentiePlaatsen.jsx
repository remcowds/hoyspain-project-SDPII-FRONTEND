import React, { useCallback } from 'react';
import { IoHome } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { BsCalendarWeek } from 'react-icons/bs';

export default React.memo(function TitelStapAdvertentiePlaatsen(props) {
	const { icon, tekst } = props;

	const setIcon = useCallback(() => {
		switch (icon) {
			case 'standaard':
				return <IoHome size={25} />;
			case 'prijs':
				return <FaRegMoneyBillAlt size={25} />;
			case 'beschikbaar':
				return <BsCalendarWeek size={25} />;

			default:
				break;
		}
	}, [icon]);

	return (
		<div className='flex items-center gap-x-4 py-4'>
			{setIcon()}
			<h2 className='text-xl'>{tekst}</h2>
		</div>
	);
});
