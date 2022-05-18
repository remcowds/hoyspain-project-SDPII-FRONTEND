import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { BedrijfContext } from '../../contexts/BedrijfProvider';

export default function DropDownOpties(props) {
	const [opties, setOpties] = useState([]);
  const { DIENSTEN_DATA } = useContext(BedrijfContext);
	const {t} = useTranslation();
	const getDiensten = useCallback(async () => {
		try {
			let newArray = [];
			DIENSTEN_DATA.data?.forEach((el) => newArray.push({ value: el.dienstNaam, label: el.dienstNaam }));
			newArray = newArray.sort(function(a, b) {
				return (a.value).localeCompare(b.value);
			});

			setOpties(newArray);
		} catch (error) {
			console.error(error)
		}
	}, [DIENSTEN_DATA]);
	
	useEffect(() => {
		getDiensten();
	}, [getDiensten]);

	const { setSelectedService } = props;

	const handleSelectService = useCallback(
		(e) => {
			if (e.target.value === `Alles`)
			{
				setSelectedService("");
			} else{
				setSelectedService(e.target.value);
			}
		},
		[setSelectedService]
	);

	return (
		<select
			className='mx-5 border-2 border-weblichtgrijs rounded-md w-44 h-12 text-webgrijs focus:border-weboranje duration-300'
			defaultValue=''
			onChange={handleSelectService}>
			<option value='' disabled >
				{t('home.search.select')}
			</option>
			<option value='Alles'>{t('diensten.alles')}</option>
			{opties.map((optie) => {
				return <option value={optie.value} key={optie.value}>{optie.label}</option>;
			})}
		</select>
	);
}
