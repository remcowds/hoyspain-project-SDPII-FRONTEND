import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Rating from './Rating';
import { useState } from 'react';
import { WoningContext } from '../../contexts/WoningProvider';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tag from './Tag';
import { useTranslation } from 'react-i18next';

const valueLabelFormat = (value) => {
	return <span className='font-semibold'>€{value}</span>;
};
const PrijsSlider = styled(Slider)(() => ({
	color: '#bcbfc5',
	height: 2,
	'.MuiSlider-valueLabel': {
		fontSize: 12,
		fontWeight: 'normal',
		top: 0,
		backgroundColor: 'unset',
		color: 'black',
	},
	'.MuiSlider-thumb': {
		backgroundColor: '#EF6C00',
		border: '2px solid white',
	},
}));

const classGray =
'border-2 border-gray-300 rounded-md p-1 ml-1 mt-1 text-sm cursor-pointer';
const classOrange =
'border-2 border-weboranje rounded-md p-1 ml-1 mt-1 text-sm cursor-pointer text-white bg-weboranje';

export default function SideBarFilters(props) {
	const { filters, setFilters } = props;
	
	const { GETWoningen } = useContext(WoningContext);
	const {t} = useTranslation();
	
	//slider prijs
	const [valuePrijs, setValuePrijs] = useState([0, 500]);
	
	const handleChange = (e, newValue) => {
		setValuePrijs(newValue);
	};

	const { register, handleSubmit, reset } = useForm();

	const resetForm = useCallback(() => {
		const children = Array.from(
			document.getElementById('divTags').children
		);

		const labels = children.filter((child) => child.tagName === 'LABEL');

		labels.forEach((label) => {
			label.className = classGray;
		});

		document.getElementById('sorteren').value = '';

		setValuePrijs([0, 500]);
		reset();
	}, [reset]);

	const submit = useCallback(
		(data) => {
			if (valuePrijs[0] !== 0) {
				data.minPrijs = valuePrijs[0];
			}
			if (valuePrijs[1] !== 500) {
				data.maxPrijs = valuePrijs[1];
			}

			let checkedFilters = Object.entries(data);
			checkedFilters = checkedFilters.filter((filter) => {
				return filter[1] !== false;
			});

			//object van maken
			const filterObject = {};
			checkedFilters.forEach((filter) => {
				filterObject[filter[0]] = filter[1];
			});

			setFilters(filterObject);

			GETWoningen(filterObject);

			resetForm();
		},
		[valuePrijs, setFilters, GETWoningen, resetForm]
	);

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className='ml-2 my-10 p-4 border-solid border-2 border-gray-300 rounded-lg shadow-[8px_10px_20px_rgba(0,0,0,0.25)] self-start flex-col w-[255px]'>
			<h3 className='text-weboranje text-2xl p-1 font-semibold'>
				{t('advertentiepagina.filters.title')}
			</h3>
			<div className='border-t-2 border-gray-300 px-3 pb-2'>
				<p className='text-base py-2 font-semibold'>
				{t('advertentiepagina.filters.subtitle1.title')}
				</p>
				<div className='flex flex-col gap-y-1 mb-2'>
					<div className='flex items-center '>
						<input
							type='checkbox'
							id='wifi'
							name='wifi'
							value={'WiFi'}
							{...register('WiFi')}
						/>
						<label htmlFor='wifi' className='pl-2 text-sm'>
						{t('advertentiepagina.filters.subtitle1.wifi')}
						</label>
					</div>
					<div className='flex items-center '>
						<input
							type='checkbox'
							id='Zwembad'
							name='Zwembad'
							value={'Zwembad'}
							{...register('Zwembad')}
						/>
						<label htmlFor='Zwembad' className='pl-2 text-sm'>
						{t('advertentiepagina.filters.subtitle1.zwembad')}
						</label>
					</div>
					<div className='flex items-center '>
						<input
							type='checkbox'
							id='Zeezicht'
							name='Zeezicht'
							value={'Zeezicht'}
							{...register('Zeezicht')}
						/>
						<label htmlFor='Zeezicht' className='pl-2 text-sm'>
						{t('advertentiepagina.filters.subtitle1.zeezicht')}
						</label>
					</div>
					<div className='flex items-center '>
						<input
							type='checkbox'
							id='Airco'
							name='Airco'
							value={'Airco'}
							{...register('Airco')}
						/>
						<label htmlFor='Airco' className='pl-2 text-sm'>
						{t('advertentiepagina.filters.subtitle1.airco')}
						</label>
					</div>
				</div>
			</div>
			<div className='border-t-2 border-gray-300 px-3 pb-2'>
				<p className='text-base py-2 font-semibold'>{t('advertentiepagina.filters.subtitle2.title')}</p>
				<div className='px-3 pt-3'>
					<PrijsSlider
						value={valuePrijs}
						onChange={handleChange}
						valueLabelDisplay='on'
						size='small'
						color='primary'
						min={0}
						max={500}
						valueLabelFormat={valueLabelFormat}
					/>
				</div>
			</div>
			<div className='border-t-2 border-gray-300 px-3 pb-2'>
				<p className='text-base py-2 font-semibold'>{t('advertentiepagina.filters.subtitle3.title')}</p>
				<div
					id='divTags'
					className='flex flex-wrap pb-2 space-x-1 space-y-1'>
					<Tag
						register={register}
						name='avontuur'
						label={t('advertentiepagina.filters.subtitle3.avontuur')}
						classOrange={classOrange}
						classGray={classGray}
					/>
					<Tag
						register={register}
						name='reizen'
						label={t('advertentiepagina.filters.subtitle3.reizen')}
						classOrange={classOrange}
						classGray={classGray}
					/>
					<Tag
						register={register}
						name='culinair'
						label={t('advertentiepagina.filters.subtitle3.culinair')}
						classOrange={classOrange}
						classGray={classGray}
					/>
					<Tag
						register={register}
						name='ontspanning'
						label={t('advertentiepagina.filters.subtitle3.ontspanning')}
						classOrange={classOrange}
						classGray={classGray}
					/>
					<Tag
						register={register}
						name='sporten'
						label={t('advertentiepagina.filters.subtitle3.sporten')}
						classOrange={classOrange}
						classGray={classGray}
					/>
				</div>
			</div>
			<div className='px-3 border-t-2 border-gray-300'>
				<Rating
					filters={filters}
					setFilters={setFilters}
					register={register}
				/>
			</div>
			<div className='px-3 mt-6 mb-2'>
				<input
					type='submit'
					value={t('advertentiepagina.filters.toevoegen')}
					className=' cursor-pointer bg-weboranje rounded-md text-white hover:shadow-inner 
        hover:shadow-orange-700 p-3 w-full'
				/>
			</div>
		</form>
	);
}
