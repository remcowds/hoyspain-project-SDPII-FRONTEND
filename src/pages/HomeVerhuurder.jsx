import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import LijstWoningen from '../Components/Advertentiepage/LijstWoningen';
import Title from '../Components/Extra components/Title';
import Footer from '../Components/Global Components/Footer';
import NavBar from '../Components/Global Components/NavBar';
import { useSession } from '../contexts/AuthProvider';
import { WoningContext } from '../contexts/WoningProvider';

const HomeVerhuurder = () => {
	const { user } = useSession();

	const [woningen, setWoningen] = useState([]);

	const { GETWoningenByUser, WONING_DATA } = useContext(WoningContext);

	useEffect(() => {
		const get = async () => {
			setWoningen(await GETWoningenByUser(user?.userID));
		};
		get();
	}, [GETWoningenByUser, user, WONING_DATA]);

	const [redirect, setRedirect] = useState(false);

	const handleVoegAdvertentieToe = useCallback(() => {
		setRedirect(!redirect);
	}, [redirect]);
	const { t } = useTranslation();
	return (
		<>
			<Title title={t('titel.yourhome')} description='idk' />
			<NavBar selected='1' />
			<section className='bg-red-100 pb-10 min-h-screen'>
				<div className='container mx-auto pt-8 max-w-5xl'>
					{woningen.length > 0 ? (
						<LijstWoningen
							WONING_DATA={woningen}
							itemsPerPage={8}
							isVerhuurderPage={true}
						/>
					) : (
						<div className='my-28 mx-auto max-w-3xl rounded-lg bg-white py-3'>
							<p className='text-2xl text-center p-2'>
								{t('yourhome.overzicht')}
							</p>
							<br />
							<br />
							<p className='text-2xl text-center p-2'>
								{t('yourhome.none')}
							</p>
							<p className='text-2xl text-center p-2'>
								{t('yourhome.voeg')}
								<span
									className='text-weboranje cursor-pointer'
									onClick={handleVoegAdvertentieToe}>
									{t('yourhome.here')}
								</span>{' '}
								{t('yourhome.toe')}
							</p>
						</div>
					)}
				</div>
			</section>
			<Footer kleur='bg-red-100' />
			{redirect ? <Navigate to='/plaatsadvertentie' /> : null}
		</>
	);
};

export default HomeVerhuurder;
