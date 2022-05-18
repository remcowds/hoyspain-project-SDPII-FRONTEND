import { styled } from '@mui/material/styles';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import { nl } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/lab';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import { useCallback, useContext, useEffect, useState } from 'react';
import DisplayDatesInTekst from './DisplayDatesInTekst';
import { CurrentWoningContext } from '../../../contexts/CurrentWoningProvider';
import PrijsInstellenLabelInput from '../PrijsInstellen/PrijsInstellenLabelInput';
import { getBoekingenByWoning } from '../../../API/boekingen';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';

const StyledDateRangePicker = styled(StaticDateRangePicker)(() => ({
	'.MuiPickersDay-root.Mui-disabled': {
		// backgroundColor: '#F5F5F5',
		color: 'red',
		opacity: 0.5,
	},
}));

export default function DisplayDates(props) {
	const { t } = useTranslation();
	const { nietBeschikbaar, setNietBeschikbaar } = props;
	const { isPrijsAanpassingPage } = props;

	const { currentInfoWoning, setcurrentInfoWoning } =
		useContext(CurrentWoningContext);

	const [currentDates, setCurrentDates] = useState([null, null]);

	const handleChange = useCallback((newValue) => {
		setCurrentDates(newValue);
	}, []);

	const update = useCallback(() => {
		if (currentDates[0] === null || currentDates[1] === null) return;

		//indien het beschikbaarheden zijn:
		if (!isPrijsAanpassingPage) {
			// console.log('nb');
			//state beschikbaarheden updaten
			setNietBeschikbaar([...nietBeschikbaar, currentDates]);
		} else {
			const prijs = document.getElementById('Prijsaanpassing');
			const prijsvalue = prijs.value;

			//indien het prijsaanpassingen zijn
			const tempPrijsAanp = [
				...(currentInfoWoning.prijsAanpassing ?? []),
				{
					data: currentDates,
					prijsPerNachtPerPersoon: prijsvalue,
				},
			];

			setcurrentInfoWoning({
				...currentInfoWoning,
				prijsAanpassing: tempPrijsAanp,
			});
		}

		//daterange resetten
		setCurrentDates([null, null]);
	}, [
		currentDates,
		nietBeschikbaar,
		setNietBeschikbaar,
		isPrijsAanpassingPage,
		currentInfoWoning,
		setcurrentInfoWoning,
	]);

	const [boekingen, setBoekingen] = useState([]);

	useEffect(() => {
		const get = async () => {
			setBoekingen(
				await (
					await getBoekingenByWoning(currentInfoWoning.woningID)
				).data
			);
		};
		get();
	}, [currentInfoWoning]);

	const disableDates = useCallback(
		(date) => {
			if (isPrijsAanpassingPage) return;
			let bool = false;
			nietBeschikbaar?.forEach((dates) => {
				if (date >= dates[0] && date <= dates[1]) {
					bool = true;
				}
			});

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
		[nietBeschikbaar, isPrijsAanpassingPage, boekingen]
	);

	const handleDeleteBeschikbaarheid = useCallback(
		(dates) => {
			const temp = nietBeschikbaar.filter((date) => date !== dates);
			setNietBeschikbaar(temp);
		},
		[nietBeschikbaar, setNietBeschikbaar]
	);

	return (
		<div className='flex flex-col items-center justify-between h-fit'>
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
					className='border-2 rounded-lg h-[360px] w-[630px] flex justify-center mt-2'
					disablePast={true}
					calendars={2}
					displayStaticWrapperAs='desktop'
					shouldDisableDate={disableDates}
					value={currentDates}
					onChange={handleChange}
					renderInput={() => {}}
				/>
			</LocalizationProvider>
			<div className='flex items-center'>
				{isPrijsAanpassingPage && (
					<PrijsInstellenLabelInput
						register={() => {}}
						inputID='Prijsaanpassing'
						DV={currentInfoWoning?.prijsPerNachtPerPersoon ?? 0}
					/>
				)}
				<button
					type='button' //prevent submit
					className='bg-weboranje text-white font-bold text-lg rounded-lg p-2 m-3 disabled:bg-weblichtgrijs cursor-pointer'
					onClick={update}>
					{isPrijsAanpassingPage
						? t('adv.2.update')
						: t('adv.2.block')}
				</button>
			</div>
			<DisplayDatesInTekst
				isPrijsAanpassingPage={isPrijsAanpassingPage}
				nietBeschikbaar={nietBeschikbaar}
				handleDeleteBeschikbaarheid={handleDeleteBeschikbaarheid}
			/>
		</div>
	);
}
