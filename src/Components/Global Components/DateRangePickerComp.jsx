import React, { useEffect, useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { nl } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function DateRangePickerComp2(props) {
	const { dataVanTot, setDataVanTot } = props;

	const van = dataVanTot[0];
	const tot = dataVanTot[1];

	const [value, setValue] = useState([van || null, tot || null]);

	const onChange = (newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		setDataVanTot([value[0], value[1]]);
	}, [setDataVanTot, value]);
	const {t} = useTranslation();
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns} locale={i18n.language.substring(0,2)==="en"?enUS:i18n.language.substring(0,2)==="nl"?nl:enUS}>
				<DateRangePicker
					className='h-[430px]'
					showToolbar={true}
					disablePast={true}
					inputFormat='dd/MM/yyyy'
					toolbarFormat='dd/MM/yyyy'
					startText={t('home.search.datumvan')}
					endText={t('home.search.datumtot')}
					value={value}
					onChange={(newValue) => {
						onChange(newValue);
					}}
					renderInput={(startProps, endProps) => (
						<React.Fragment>
							<TextField
								{...startProps}
								size='small'
								autoComplete='off'
							/>
							<Box sx={{ mx: 1 }}> - </Box>
							<TextField
								{...endProps}
								size='small'
								autoComplete='off'
							/>
						</React.Fragment>
					)}
				/>
			</LocalizationProvider>
			{/* <DateRangePicker
				ranges={[selectionRange]}
				onChange={handleSelectDate}
				dateDisplayFormat='dd LLLL yyyy'
				locale={nl}
				minDate={today}
				rangeColors={['#EF6C00']}
			/> */}
			{/* <button
				className='ml-auto mr-2 mb-2 mt-[-20px] py-1 px-2 bg-gray-100 rounded-md'
				onClick={handleStelDatumIn}>
				Stel in
			</button> */}
		</>
	);
}
