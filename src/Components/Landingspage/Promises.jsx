import React from 'react';
import palmboom from '../../Images/Landingspage/palmboom.svg';
import kalender from '../../Images/Landingspage/kalender.svg';
import parasol from '../../Images/Landingspage/parasol.svg';
import confirmatie from '../../Images/Landingspage/confirmatie.svg';
import RechthoekPromise from '../../Components/Landingspage/RechthoekPromise';
import { useTranslation } from 'react-i18next';

const Promises = () => {
	const {t} = useTranslation();
	return (
		<>
			<div className='w-11/12 pb-20 bg-white z-10 my-16'>
				<h2 className='schuinSchrift text-7xl unselectable pb-6 text-center'>
				{t('home.promise.title')}
				</h2>
				<div className='flex flex-col md:flex-row md:justify-evenly mx-10'>
					<RechthoekPromise
						color='shadow-red-200'
						url={parasol}
						tekst={t('home.promise.promise1_1')}
						oranjetekst={t('home.promise.promise1_2')}
						className='w-2/12'
					/>
					<RechthoekPromise
						color='shadow-green-300'
						url={kalender}
						tekst={t('home.promise.promise2_1')}
						oranjetekst={t('home.promise.promise2_2')}
						className='w-2/12'
					/>
					<RechthoekPromise
						color='shadow-teal-200'
						url={palmboom}
						tekst={t('home.promise.promise3_1')}
						oranjetekst={t('home.promise.promise3_2')}
						className='w-2/12'
					/>
					<RechthoekPromise
						color='shadow-yellow-200'
						url={confirmatie}
						tekst={t('home.promise.promise4_1')}
						oranjetekst={t('home.promise.promise4_2')}
						className='w-2/12'
					/>
				</div>
			</div>
		</>
	);
};

export default Promises;
