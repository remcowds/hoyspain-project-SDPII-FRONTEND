import React, { useCallback, useEffect, useState } from 'react';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import { nl } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
import { styled } from '@mui/material/styles';
import { getBoekingenByWoning } from '../../API/boekingen';
import i18n from '../../i18n';

const StyledDateRangePicker = styled(StaticDateRangePicker)(() => ({
	'.MuiPickersDay-root.Mui-disabled': {
		// backgroundColor: '#F5F5F5',
		// color: 'red',
		opacity: 0.5,
		textDecoration: 'line-through',
	},
}));

export default function DateRangeBoeking({ value, setValue, woningID }) {
	const [boekingen, setBoekingen] = useState([]);

	useEffect(() => {
		const get = async () => {
			setBoekingen(await (await getBoekingenByWoning(woningID)).data);
		};
		get();
	}, [woningID]);

	const handleChange = useCallback(
		(newValue) => {
			setValue(newValue);
		},
		[setValue]
	);

	//wel zeer onperformant dus mss iet anders zoeken
	const disableDates = useCallback(
		(date) => {
			let bool = false;
			boekingen.forEach((boeking) => {
				const start = new Date(boeking.datumAankomst).setHours(0);
				const eind = new Date(boeking.datumVertrek).setHours(0);
				if (date >= start && date <= eind) {
					//date moet disabled worden
					bool = true;
				}
			});
			return bool;
		},
		[boekingen]
	);

	return (
		<div id='daterangepickerdetail'>
			<LocalizationProvider
				dateAdapter={DateFnsAdapter}
				locale={
					i18n.language.substring(0, 2) === 'en'
						? enUS
						: i18n.language.substring(0, 2) === 'nl'
						? nl
						: enUS
				}>
				<StyledDateRangePicker
					className='border-2 rounded-lg h-[360px] w-[630px]'
					disablePast={true}
					calendars={2}
					displayStaticWrapperAs='desktop'
					// showToolbar={true}
					shouldDisableDate={disableDates}
					value={value}
					onChange={(newValue) => handleChange(newValue)}
					renderInput={() => {}}
				/>
			</LocalizationProvider>
		</div>
	);
}
