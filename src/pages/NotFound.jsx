import React, { useEffect, useState } from 'react';
import Title from '../Components/Extra components/Title'
import { Navigate, NavLink } from 'react-router-dom';
import NotFound from '../Images/NotFoundPage/notFound.jpg'
import NavBar from '../Components/Global Components/NavBar';
import Footer from '../Components/Global Components/Footer';

export default function Home() {
	const [redirect, setRedirect] = useState(false);
	const [countdownTimer, setCountdownTimer] = useState(5);

	useEffect(() => {
		setTimeout(() => {
			setRedirect(true);
		}, 6000);
	}, []);
	useEffect(() => {
		setTimeout(() => {
			if (countdownTimer > 0)
			setCountdownTimer(countdownTimer - 1);
		}, 1000);
	}, [countdownTimer]);

	return (
		<>
			<NavBar />
			<Title title='Not found' description='Pagina bestaat niet' />
			<div className="pt-5 xl:mt-40 md:mt-32 flex justify-center flex-col">
			<h2 className='text-center text-xl w-full py-4'>De pagina die u opvroeg bestaat niet (meer)</h2>
			<div className="">
				<img src={NotFound} alt="Not found" className="h-40 sm:h-56 md:h-60 lg:h-72 mx-auto rounded-md" draggable="false"/>
			</div>
			<h2 className='text-center text-xl w-full py-4'>Indien u denkt dat dit een probleem is, klik <NavLink to='/' className='text-weboranje'>hier</NavLink>.</h2>
			<h2 className='text-center text-xl w-full py-4'>U wordt teruggestuurd{countdownTimer > 0 ? ` over ${countdownTimer} seconde${countdownTimer!==1?"n":""}` : ""} </h2>
			</div>
			{redirect ? <Navigate to='/' /> : null}
			<div className='pt-60'/>
			<Footer/>
		</>
	);
}