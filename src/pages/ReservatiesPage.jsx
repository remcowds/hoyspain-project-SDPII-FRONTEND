import Title from '../Components/Extra components/Title';
import NavBar from '../Components/Global Components/NavBar';
import beach from '../Images/RegisterPage/beach.jpg';
import Boogjes from '../Components/Landingspage/Boogjes';
import OverzichtReservaties from '../Components/ReservatiesPage/OverzichtReservaties';
import Footer from '../Components/Global Components/Footer';
import { useTranslation } from 'react-i18next';

export default function ReservatiesPage(props) {
	const { t } = useTranslation();
	return (
		<>
			<Title
				title={t('titel.reservaties')}
				description='Advertentiepagina waar alle advertenties weergegeven worden.'
			/>
			<NavBar />
			<section className='relative mb-10 '>
				<img
					src={beach}
					alt='foto advertentiepagina'
					draggable='false'
					className='w-screen object-cover h-56'
				/>
				<p className='absolute top-20 text-6xl text-center schuinSchrift text-white unselectable w-full z-20'>
					{t('reservaties.your_reservations')}
				</p>
				<Boogjes extra='bg-transparent absolute top-44' />
				<section className='container mx-auto mt-16 w-1/2 max-w-5xl mb-56'>
					<OverzichtReservaties />
				</section>
			</section>
			<Footer />
		</>
	);
}
