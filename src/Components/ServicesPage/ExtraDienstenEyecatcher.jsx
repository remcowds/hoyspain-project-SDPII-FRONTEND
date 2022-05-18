import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ExtraDienstenEyecatcher({ madrid }) {
	const {t} = useTranslation();
	return (
		<>
			<div className='fixed text-center text-white w-screen h-fit bg-white top-12 -z-20'>
				<img
					src={madrid}
					alt='madrid'
					draggable='false'
					className='w-full drop-shadow-xl opacity-60'
				/>
				<p className='absolute top-20 md:top-32 left-1/2 -translate-x-1/2 text-8xl schuinSchrift  text-webgrijs'>
					{t("diensten.eyecatcher")}
				</p>
			</div>
			<div className='pt-72'></div>
		</>
	);
}
