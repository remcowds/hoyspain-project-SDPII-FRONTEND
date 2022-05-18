import React from 'react'
import GegevensTabel from '../Components/Account/GegevensTabel';
import Title from '../Components/Extra components/Title'
import NavBar from '../Components/Global Components/NavBar'
import Boogjes from '../Components/Landingspage/Boogjes'
import favoriete from '../Images/Account/favorieten.jpg';
import { useSession } from '../contexts/AuthProvider';
import Footer from '../Components/Global Components/Footer';
import MijnFavorieten from '../Components/Favorieten/MijnFavorieten';
import { useTranslation } from 'react-i18next';

const MijnFavorietenPage = () => {
  const { loading, isAuthed } = useSession();
	const {t} = useTranslation();

  return (
    <>
      <Title
				title={t('titel.favorieten')}
				description='Pagina voor de favorieten van de gebruiker.'
			/>
			<NavBar />
			<section className='relative mb-10 '>
				<img
					src={favoriete}
					alt='foto advertentiepagina'
					draggable='false'
					className='w-screen object-cover h-56'
				/>
				<p className='absolute top-20 text-6xl text-center schuinSchrift text-white unselectable w-full z-20'>
				{t('favorieten.jouw_favorieten')}
				</p>
				<Boogjes extra='bg-transparent absolute top-44' />
				<section className='container mx-auto mt-16 w-1/2 max-w-5xl mb-56'>
					<MijnFavorieten />
				</section>
			</section>
			<Footer />
      </>
  )
}

export default MijnFavorietenPage