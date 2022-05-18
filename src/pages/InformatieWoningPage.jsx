import { useParams } from 'react-router-dom';
import Title from '../Components/Extra components/Title';
import Footer from '../Components/Global Components/Footer';
import NavBar from '../Components/Global Components/NavBar';
import NaametcWoningDetail from '../Components/InformatieWoningPage/NaametcWoningDetail';
import { WoningContext } from '../contexts/WoningProvider';
import { useContext, useEffect, useState } from 'react';
import FotosWoning from '../Components/InformatieWoningPage/FotosWoning';
import BeschrijvingEnzo from '../Components/InformatieWoningPage/BeschrijvingEnzo';
import BoekingStarten from '../Components/InformatieWoningPage/BoekingStarten/BoekingStarten';
import Recensies from '../Components/InformatieWoningPage/Recensies';
import { RecensieProvider } from '../contexts/RecensieProvider';
import { useSession } from '../contexts/AuthProvider';
import Loading from '../Components/Extra components/Loading';

export default function InformatieWoningPage() {
	const { id } = useParams();

	const { GETWoning, loading, error } = useContext(WoningContext);

	const [woning, setWoning] = useState();

	useEffect(() => {
		async function get() {
			const woning = await GETWoning(id);
			setWoning(woning);
		}
		get();
	}, [GETWoning, id]);

	const { isAuthed } = useSession();

	if (loading) {
		return <Loading color='#EF6C00' type='bars' />;
	}

	if (error) {
		return <p>error...</p>;
	}

	if (woning) {
		return (
			<>
				<Title
					title='Advertenties'
					description='Advertentiepagina waar alle advertenties weergegeven worden.'
				/>
				<NavBar selected='2' />
				<div className='lg:mx-20 xl:mx-36 2xl:mx-56 mx-2'>
					<NaametcWoningDetail woning={woning} />
					<FotosWoning afbeeldingen={woning.linkAfbeeldingen} />
					<BeschrijvingEnzo woning={woning} />
					<BoekingStarten id={id} woning={woning} />
					<RecensieProvider>
						<Recensies woningID={id} rating={woning.rating} />
					</RecensieProvider>
				</div>
				<Footer />
			</>
		);
	}
	return <Loading color='#EF6C00' type='bars' />;
}
