import React, { useCallback, useContext, useEffect, useState } from 'react';
import LabelInput from '../../Extra components/LabelInput';
import { GoSearch } from 'react-icons/go';
import { FaRegPaperPlane } from 'react-icons/fa';
import { BiCalendar } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import DateRangePickerComp from '../DateRangePickerComp';
import { WoningContext } from '../../../contexts/WoningProvider';
import OptionDeForm from './OptionDeForm';
import { GETRegios } from '../../../API/regio';
import { useTranslation } from 'react-i18next';
import { formatDateYMD } from '../../../core/dateFns';

export default function DeForm({ classNameProp }) {
	const currentPage = useLocation().pathname;
	const { t } = useTranslation();
	const { register, handleSubmit } = useForm();

	const [regios, setRegios] = useState([]);

	useEffect(() => {
		const get = async () => {
			const values = await GETRegios();
			setRegios(values.data.data);
		};
		get();
	}, [setRegios]);

	const { filtersDeFormData, setFiltersDeFormData } =
		useContext(WoningContext);

	const [redirect, setRedirect] = useState(false);

	const [dataVanTot, setDataVanTot] = useState(filtersDeFormData.data);

	const submit = useCallback(
		(data) => {
			let datumArray;
			if (dataVanTot[0]) {
				datumArray = dataVanTot.map((el) => {
					return formatDateYMD(el);
				});
			}
			data.data = datumArray || [];
			let aantalPersonen = data.Personen || data.Persons;
			console.log(aantalPersonen);
			data.personen = aantalPersonen;
			delete data.Personen;
			setFiltersDeFormData(data);
			localStorage.setItem('Persons', aantalPersonen);
			//huidige filters wegdoen
			document.getElementById('buttonDeleteAllFilters')?.click();

			if (!currentPage.includes('huren')) {
				setRedirect(true);
			}
		},
		[currentPage, dataVanTot, setFiltersDeFormData]
	);

	return (
		<>
			<form className={classNameProp} onSubmit={handleSubmit(submit)}>
				<span className='font-bold border-b-[2px] border-gray-400 self-start m-[-1px] z-10 text-webgrijs '>
					{t('home.search.title')}
				</span>
				<div className='flex border-t-[1px] pt-2 border-gray-200 justify-between gap-x-4 text-webgrijs font-semibold'>
					<div className='flex flex-col gap-y-1 w-1/3 mr-8'>
						<label>
							<FaRegPaperPlane className='inline mr-2 mb-1' />
							{t('home.search.regio')}
						</label>
						<select
							name='regio'
							id='regio'
							className='border-solid border-gray-200 rounded-md p-1 mr-auto bg-transparent border-0 w-full'
							onChange={null}
							defaultValue={filtersDeFormData.regio || ''}
							{...register('regio')}>
							<option value='' disabled className='text-black/30'>
								{t('home.search.select')}
							</option>
							{regios?.map((regio) => (
								<OptionDeForm
									key={regio.id}
									keyValueWaarde={regio.regio}
								/>
							))}
						</select>
					</div>
					<div className='flex flex-col gap-y-1'>
						<label className='flex items-center'>
							<BiCalendar className='mr-1' />
							{t('home.search.datum')}
						</label>
						<DateRangePickerComp
							dataVanTot={dataVanTot}
							setDataVanTot={setDataVanTot}
						/>
					</div>
					<LabelInput
						label={t('home.search.personen')}
						placeholder={t('home.search.aantal')}
						type='number'
						icon={<BsPerson className='inline' />}
						register={register}
						min={0}
						defaultValue={filtersDeFormData.personen}
					/>
					<button
						className='bg-weboranje rounded-md text-white hover:shadow-inner hover:shadow-orange-700 ml-[-10px] px-3 h-10 w-10 mt-2'
						onClick={handleSubmit}>
						<GoSearch className='text-lg text-center' />
					</button>
				</div>
			</form>
			{redirect ? <Navigate to='/huren' /> : null}
		</>
	);
}
