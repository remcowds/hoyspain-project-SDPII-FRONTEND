import { Input, InputAdornment } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import BijkomendeKostenSlider from './BijkomendeKostenSlider';

export default function PrijsInstellenExtraKosten(props) {
	const { setExtraKosten, extraKosten } = props;

	const naamkostRef = useRef(null);
	const prijsextraRef = useRef(null);
	const [perNacht, setPerNacht] = useState(false);

	const handleVoegExtraKostToe = useCallback(() => {
		const naamKostValue = naamkostRef.current.value;

		const prijsExtraValue = Number(prijsextraRef.current.lastChild.value);

		if (naamKostValue && prijsExtraValue) {
			setExtraKosten([
				...extraKosten,
				{
					naamKost: naamKostValue,
					prijs: prijsExtraValue,
					eenmalig: !perNacht,
				},
			]);
		}

		naamkostRef.current.value = null;
		prijsextraRef.current.lastChild.value = null;

		naamkostRef.current.focus();
	}, [extraKosten, setExtraKosten, perNacht]);

	return (
		<div className='flex flex-col'>
			<label>Bijkomende kosten</label>
			<div className='flex flex-col'>
				<BijkomendeKostenSlider
					perNacht={perNacht}
					setPerNacht={setPerNacht}
				/>
				<div className='flex my-2'>
					<input
						type='text'
						name='naamKost'
						id='naamKost'
						className=' border-2 rounded-md w-24 p-[2px] pl-1 mr-4'
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
							className='text-weboranje my-auto cursor-pointer'
						/>
					</button>
				</div>
			</div>
			{/* hier mappen */}
			{extraKosten?.map((kost) => (
				<div className='flex space-x-2' key={kost.naamKost}>
					<p className='text-lg'>
						{kost.eenmalig ? `(Eenmalig) ` : `(Per nacht) `}
						{`${kost.naamKost}: €${kost.prijs}`}
					</p>
				</div>
			))}
		</div>
	);
}
