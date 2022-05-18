import Title from '../Components/Extra components/Title';
import NavBar from '../Components/Global Components/NavBar';
import foto_advertentiepagina from '../Images/AdvertentiePage/foto_advertentiepagina.png';
import SideBarFilters from '../Components/Advertentiepage/SideBarFilters';
import OverzichtWoningen from '../Components/Advertentiepage/OverzichtWoningen';
import Footer from '../Components/Global Components/Footer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AdvertentiePage() {
	//bug: afbeeldingenswiper open en ge doet back me uw browser, dan kunde nimr scrollen, vandaar
	document.body.style.overflowY = 'scroll';

	const [filters, setFilters] = useState([]);
	const {t} = useTranslation();
	return (
		<>
			<Title
				title={t('titel.advertentiepagina')}
				description='Advertentiepagina waar alle advertenties weergegeven worden.'
			/>
			<NavBar selected='2' />
			<section className='relative'>
				<img
					src={foto_advertentiepagina}
					alt='foto advertentiepagina'
					draggable='false'
					className='w-screen object-cover h-56'
				/>
				<p className='absolute top-24 text-6xl text-center schuinSchrift text-white unselectable w-full z-20'>
					
					{t('advertentiepagina.eyecatcher')}
				</p>
			</section>

			<section className='container mx-auto px-6'>
				<div className='flex justify-center gap-x-10'>
					<SideBarFilters filters={filters} setFilters={setFilters} />
					<OverzichtWoningen
						filters={filters}
						setFilters={setFilters}
					/>
				</div>
			</section>
			<Footer />
		</>
	);
}
