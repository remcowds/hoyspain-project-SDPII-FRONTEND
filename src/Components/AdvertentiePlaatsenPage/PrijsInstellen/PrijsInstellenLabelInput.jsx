import { Input, InputAdornment } from '@mui/material';

export default function PrijsInstellenLabelInput(props) {
	const { register, label, inputID, DV, ...rest } = props;
	return (
		<div className='flex flex-col'>
			<label>{label}</label>
			<Input
				required
				inputProps={{ min: 0, step: 0.01 }}
				startAdornment={
					<InputAdornment position='start'>€</InputAdornment>
				}
				type='number'
				name={inputID}
				id={inputID}
				min={0}
				className='border-2 rounded-md w-24 p-[2px] pl-1'
				defaultValue={DV}
				{...rest}
				{...register(inputID)}
			/>
		</div>
	);
}
