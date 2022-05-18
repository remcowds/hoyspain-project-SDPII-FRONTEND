import React from 'react';
import Title from '../Components/Extra components/Title';
import NavBar from '../Components/Global Components/NavBar';
import Promises from '../Components/Landingspage/Promises';
import ExternePaginas from '../Components/Landingspage/ExternePaginas';
import Fotogallerij from '../Components/Landingspage/Fotogallerij';
import Eyecatcher from '../Components/Landingspage/Eyecatcher.jsx';
import Footer from '../Components/Global Components/Footer';
import Boogjes from '../Components/Landingspage/Boogjes';
import Ontdekkingen from '../Components/Landingspage/Ontdekkingen';
import { useTranslation } from 'react-i18next';

const setLocStWithExpiry = (key, value, ttl) => {
	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: new Date().getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

const Home = () => {
	const { t } = useTranslation();
	if (
		!localStorage.getItem('warninglogged') ||
		JSON.parse(localStorage.getItem('warninglogged'))?.expiry <=
			new Date().getTime()
	) {
		console.log(
			`%cPlease only use this terminal if you know what you are doing and have permission to do so by Hoyspain.`,
			'background-color: #E22134; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white; border-radius:8px;'
		);
		console.log(
			`%cHacking is illegal and all actions will be logged.`,
			'background-color: #E22134; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white; border-radius:8px;'
		);
	}
	setLocStWithExpiry('warninglogged', true, 1000 * 60 * 60);
	return (
		<>
			<Title
				title={t('titel.home')}
				description='Homepagina voor opzoeken van huizen op Hoispain'
			/>
			<NavBar selected='1' />
			<section className='relative'>
				<Eyecatcher />
				{/*De hoofdafbeelding met quote erin*/}
			</section>

			<Boogjes extra='bg-transparent' />
			<div className='pt-2 bg-white pb-2 w-12/12 flex justify-center overflow-hidden'>
				<Promises />
			</div>
			<Boogjes extra='rotate-180 bg-weblichtoranje' />
			<Ontdekkingen />
			<Boogjes extra='bg-weblichtoranje' />

			<div className='pt-2 bg-white pb-2 w-12/12 flex justify-center overflow-hidden'>
				<ExternePaginas />
			</div>
			<Boogjes extra='rotate-180 bg-weblichtoranje' />
			<Fotogallerij />

			<Footer kleur='bg-weblichtoranje' />
		</>
	);
};

export default Home;
