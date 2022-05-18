import React from 'react'
import GegevensTabel from '../Components/Account/GegevensTabel';
import Title from '../Components/Extra components/Title'
import NavBar from '../Components/Global Components/NavBar'
import Boogjes from '../Components/Landingspage/Boogjes'
import hammock from '../Images/Account/hammock.jpg';
import { useSession } from '../contexts/AuthProvider';
import Footer from '../Components/Global Components/Footer';
import { useTranslation } from 'react-i18next';

const MijnGegevens = () => {
  const { loading, isAuthed } = useSession();
  const {t} = useTranslation();
  return (
    <>
      <Title title={t('titel.account')} description="Jouw accountgegevens bekijken" />
      <NavBar selected="88" />
      <div className="h-80">
      <img
        src={hammock}
        alt='hammock'
        draggable='false'
        className='-z-10 fixed -top-32 xl:-top-96 w-full'
      />
	    <p className='fixed schuinSchrift text-white md:text-9xl text-6xl sm:text-7xl text-center unselectable w-full top-28 sm:top-60 -z-10'>
      {t('account.title')}
			</p>
      </div>
      <Boogjes/>
            <GegevensTabel/>
      <Footer/>
    </>
  )
}

export default MijnGegevens