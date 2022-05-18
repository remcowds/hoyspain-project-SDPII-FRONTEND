import { useCallback } from 'react';

export default function Tag(props) {
	const { register, name, classGray, classOrange, label } = props;

	const handleTagClick = useCallback(
		(e) => {
			if (e.target.className === classGray) {
				e.target.className = classOrange;
			} else {
				e.target.className = classGray;
			}
		},
		[classGray, classOrange]
	);

	return (
		<>
			<input
				className='w-0 h-0 absolute'
				type='checkbox'
				id={name}
				name={name}
				value={name}
				{...register(name)}
			/>
			<label
				htmlFor={name}
				className={classGray}
				onClick={handleTagClick}>
				{label}
			</label>
		</>
	);
}
