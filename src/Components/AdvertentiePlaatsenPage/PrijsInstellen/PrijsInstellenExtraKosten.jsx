import { Input, InputAdornment } from '@mui/material';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function PrijsInstellenExtraKosten(props) {
	const { setExtraKosten, extraKosten } = props;

	const naamkostRef = useRef(null);
	const prijsextraRef = useRef(null);

	const handleVoegExtraKostToe = useCallback(() => {
		const naamKostValue = naamkostRef.current.value;

		const prijsExtraValue = Number(prijsextraRef.current.lastChild.value);
		console.log(prijsExtraValue);

		if (naamKostValue && prijsExtraValue) {
			setExtraKosten([
				...extraKosten,
				{ [naamKostValue]: prijsExtraValue },
			]);
		}

		naamkostRef.current.value = null;
		prijsextraRef.current.lastChild.value = null;

		naamkostRef.current.focus();
	}, [extraKosten, setExtraKosten]);
	
	const {t} = useTranslation();

	return (
		<div className='flex flex-col'>
			<label>{t('adv.3.kosten')}</label>
			<div className='flex'>
				<input
					type='text'
					name='naamKost'
					id='naamKost'
					className='border-2 rounded-md w-24 p-[2px] pl-1 mr-4'
					ref={naamkostRef}
				/>
				<Input
					inputProps={{ min: 0, step: 0.01 }}
					startAdornment={
						<InputAdornment position='start'>€</InputAdornment>
					}
					type='number'
					name='prijsExtra'
					id='prijsExtra'
					min={0}
					className='border-2 rounded-md w-24 p-[2px] pl-1 mr-4'
					ref={prijsextraRef}
				/>
				<button type='button' onClick={handleVoegExtraKostToe}>
					<AiFillCheckCircle
						size={24}
						className='my-auto cursor-pointer'
					/>
				</button>
			</div>
			{/* hier mappen */}
			{extraKosten?.map((kost) => (
				<p className='text-lg' key={Object.keys(kost)}>{`${Object.keys(
					kost
				)}: €${Object.values(kost)}`}</p>
			))}
		</div>
	);
}
