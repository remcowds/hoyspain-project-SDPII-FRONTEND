import React from 'react';
import Boogje from '../../Images/Landingspage/boogje.svg';
const Boogjes = (props) => {
	return (
		<div
			className={`flex flex-row justify-evenly boogjes w-full h-[75px] bg-repeat-x ${props.extra}`}
			style={{ backgroundImage: `url(${Boogje})` }}
		/>
	);
};

export default Boogjes;
