import { AiFillStar } from 'react-icons/ai';
import React from 'react';

export default React.memo(function GeefSterren({ aantal, extragrootte }) {
	let array = [];

	for (let i = 0; i < aantal; i++) {
		array.push(`fill${i}`);
	}

	for (let i = 0; i < 5 - aantal; i++) {
		array.push(`outline${i}`);
	}

	const visibilityStars = array[0].includes('outline') ? 'hidden' : 'visible';

	return (
		<div className='flex mr-1'>
			{array.map((el) =>
				el.includes('fill') ? (
					<AiFillStar
						key={el}
						size={extragrootte ? extragrootte : ''}
						className='text-weboranje'
					/>
				) : (
					<AiFillStar
						key={el}
						size={extragrootte ? extragrootte : ''}
						className='text-gray-300'
					/>
				)
			)}
		</div>
	);
});
