import React from 'react';
import Auto from '../../Images/Landingspage/Auto.png';
import Vragen from '../../Images/Landingspage/Vragen.png';
import Refund from '../../Images/Landingspage/Refund.png';
import Vierkant from './Vierkant';
import { useTranslation } from 'react-i18next';

const Promises = () => {
	const {t} = useTranslation();
	return (
		<>
			<div className='w-11/12 h-fit pb-20 bg-white z-10 my-16'>
				<h2 className='schuinSchrift text-7xl unselectable text-center pb-6 py-5'>
				{t('home.extern.title')}
				</h2>
				<div className='flex flex-col md:flex-row justify-evenly md:gap-0 gap-4'>
					<Vierkant
						color='bg-teal-400'
						url={Auto}
						tekst={t('home.extern.car')}
						link='/services'
					/>
					<Vierkant
						color='bg-red-300'
						url={Vragen}
						tekst={t('home.extern.questions')}
						link='/hulp'
					/>
					<Vierkant
						color='bg-gray-500'
						url={Refund}
						tekst={t('home.extern.money')}
						link='/hulp'
					/>
				</div>
			</div>
		</>
	);
};

export default Promises;
