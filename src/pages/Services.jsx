import DropDownOpties from '../Components/ServicesPage/DropDownOpties';
import React, { useContext, useEffect, useState } from 'react';
import Title from '../Components/Extra components/Title';
import NavBar from '../Components/Global Components/NavBar';
import Boogje from '../Images/Landingspage/boogje.svg';
import Footer from '../Components/Global Components/Footer';
import madrid from '../Images/Services/madrid.svg';
import ExtraDienstenEyecatcher from '../Components/ServicesPage/ExtraDienstenEyecatcher';
import BedrijfKaart from '../Components/ServicesPage/BedrijfKaart';

import plane from '../Images/Services/plane.png';
import { BedrijfContext } from '../contexts/BedrijfProvider';
import { useSession } from '../contexts/AuthProvider';
import ToevoegenDienst from '../Components/ServicesPage/ToevoegenDienst';
import { useTranslation } from 'react-i18next';

export default function Services() {
	const { BEDRIJF_DATA, GETBedrijven } = useContext(BedrijfContext);
  const { hasRole } = useSession();
	const {t} = useTranslation();
	const [selectedService, setSelectedService] = useState('');

	useEffect(() => {
		if (selectedService) {
			GETBedrijven({ dienstNaam: selectedService });
		} else {
			GETBedrijven();
		}
	}, [GETBedrijven, selectedService]);

	return (
		<>
			<Title
				title={t('titel.diensten')}
				description='Overzichtspagina voor de beschikbare services en diensten'
			/>
			<NavBar selected='3' />
			<ExtraDienstenEyecatcher madrid={madrid} />
			<div
				className='flex flex-row justify-evenly boogjes w-full h-[75px] bg-repeat-x'
				style={{ backgroundImage: `url(${Boogje})` }}
			/>
			<div className='w-12/12 bg-webwit'>
				<div className='flex justify-center py-2 overflow-hidden'>
					<img
						className='opacity-100 w-64 -scale-x-100'
						src={plane}
						alt='plane1'
						draggable='false'
					/>
					<DropDownOpties setSelectedService={setSelectedService} />
					<img
						className='opacity-100 w-64'
						src={plane}
						alt='plane1'
						draggable='false'
					/>
				</div>
				<div className='flex flex-grow flex-wrap gap-4 h-fit'>
					
					{(hasRole("owner")|| hasRole("admin")) && (
						<>
						<ToevoegenDienst/>				
						</>
					)}
					{BEDRIJF_DATA.map((bedrijf) => {
						return (
							<BedrijfKaart
								key={bedrijf.bedrijfsID}
								bedrijfsID={bedrijf.bedrijfsID}
								img={bedrijf.fotoBedrijf}
								bedrijfsNaam={bedrijf.bedrijfsNaam}
								text={bedrijf.tekstjeBedrijf}
								link={bedrijf.linkBedrijf}
								magVerwijderen={(hasRole("owner")|| hasRole("admin"))}
							/>
						);
					})}
				</div>
			</div>
			<Footer />
		</>
	);
}
