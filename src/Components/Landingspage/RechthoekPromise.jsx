import React from 'react';

const RechthoekPromise = (props) => {
	return (
		<div
			className={
				'p-5 md:p-0 flex flex-col rounded-xl shadow-md justify-center unselectable w-3/5 border-stone-50 border-2 md:w-full schaduwTekst mx-auto md:mx-2 my-2 md:my-0 ' +
				props.color
			}>
			<img
				src={props.url}
				alt=''
				draggable='false'
				className='md:w-2/6 mx-auto mt-2 mb-2 drop-shadow-md'
			/>
			<div className='flex flex-row justify-center flex-wrap'>
				<p className='schuinSchrift text-4xl text-center'>{props.tekst}</p>
				<p className='w-2'></p>
				<p className='schuinSchrift text-4xl text-weboranje text-center'>
					{props.oranjetekst}
				</p>
			</div>
		</div>
	);
};

export default RechthoekPromise;
