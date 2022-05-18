const LabelInput = ({
	label,
	icon,
	type,
	defaultValue,
	validation,
	register,
	...rest
}) => {
	return (
		<div className='flex flex-col gap-y-1 w-1/5'>
			<label htmlFor={label}>
				{icon ? icon : ''} {label[0].toUpperCase() + label.substr(1)}
			</label>
			<input
				className='pl-2 bg-opacity-0 rounded-md py-1 text-gray-700 placeholder:text-gray-700 hover:bg-opacity-20 bg-gray-400'
				defaultValue={defaultValue}
				placeholder={label}
				type={type}
				id={label}
				name={label}
				{...register(label)}
				{...rest}
			/>
		</div>
	);
};

export default LabelInput;
