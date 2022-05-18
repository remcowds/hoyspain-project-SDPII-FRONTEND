import Title from '../Components/Extra components/Title';
import NavBar from '../Components/Global Components/NavBar';
import foto_AdvertentiePlaatsen from '../Images/AdvertentiePage/foto_advertentiepagina.png';
import Boogjes from '../Components/Landingspage/Boogjes';
import StandaardInfo from '../Components/AdvertentiePlaatsenPage/StandaardInformatie/StandaardInfo';
import Footer from '../Components/Global Components/Footer';
import DatumBeschikbaar from '../Components/AdvertentiePlaatsenPage/Datums/DatumBeschikbaar';
import PrijsInstellen from '../Components/AdvertentiePlaatsenPage/PrijsInstellen/PrijsInstellen';
import { useState } from 'react';
import PreviewWoning from '../Components/AdvertentiePlaatsenPage/PreviewWoning';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector';
import InfoIcon from '@mui/icons-material/Info';

import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';


const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	backgroundColor:
		theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		backgroundImage:
			'linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(239,108,0,1) 100%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		backgroundImage:
			'linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(239,108,0,1) 100%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);',
	}),
}));

function ColorlibStepIcon(props) {
	const { active, completed, className } = props;
	const icons = {
		1: <SettingsIcon />,
		2: <MonetizationOnIcon />,
		3: <InfoIcon />,
		4: <ConfirmationNumberOutlined />,
	};

	return (
		<ColorlibStepIconRoot
			ownerState={{ completed, active }}
			className={className}>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

const steps = [
	'Stap 1. Standaard informatie ',
	'Stap 2. Datum & beschikbaarheden',
	'Stap 3. Prijs instellen',
	'Stap 4. Preview woning & plaatsen',
];

export default function AdvertentiePlaatsenPage() {
	const {t} = useTranslation();
	const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
		[`&.${stepConnectorClasses.alternativeLabel}`]: {
			top: 22,
		},
		[`&.${stepConnectorClasses.active}`]: {
			[`& .${stepConnectorClasses.line}`]: {
				backgroundImage:
					'linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(255,151,65,1) 64%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);',
			},
		},
		[`&.${stepConnectorClasses.completed}`]: {
			[`& .${stepConnectorClasses.line}`]: {
				backgroundImage:
					'linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(255,151,65,1) 64%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);',
			},
		},
		[`& .${stepConnectorClasses.line}`]: {
			height: 3,
			border: 0,
			backgroundColor:
				theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
			borderRadius: 1,
		},
	}));
	
	const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		...(ownerState.active && {
			backgroundImage:
				'linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(239,108,0,1) 100%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);',
			boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
		}),
		...(ownerState.completed && {
			backgroundImage:
				'linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(239,108,0,1) 100%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);',
		}),
	}));
	
	function ColorlibStepIcon(props) {
		const { active, completed, className } = props;
		const icons = {
			1: <SettingsIcon />,
			2: <MonetizationOnIcon />,
			3: <InfoIcon />,
			4: <ConfirmationNumberOutlined />,
		};
	
		return (
			<ColorlibStepIconRoot
				ownerState={{ completed, active }}
				className={className}>
				{icons[String(props.icon)]}
			</ColorlibStepIconRoot>
		);
	}
	
	const steps = [
		t('adv.step1'),
		t('adv.step2'),
		t('adv.step3'),
		t('adv.step4'),
	];
	
	const stepsButton = [
		t('adv.btn1'),
		t('adv.btn2'),
		t('adv.btn3'),
		t('adv.btn4'),
		t('adv.btn5'),
	];
	//   const [activePage, setActivePage] = useState(0);
	//   const displayPage = useCallback(() => {
	//     switch (activePage) {
	//       case 0:
	//         return <StandaardInfo setActivePage={setActivePage} />;

	//       case 1:
	//         return <DatumBeschikbaar setActivePage={setActivePage} />;

	//       case 2:
	//         return <PrijsInstellen setActivePage={setActivePage} />;

	//       case 3:
	//         return <PreviewWoning setActivePage={setActivePage} />;

	//       default:
	//         break;
	//     }
	//   }, [activePage]);

	const [activeStep, setActiveStep] = useState(0);

	// const [voortgang, setVoortgang] = useState(false);
	// const [voortgang2, setVoortgang2] = useState(false);
	// const { isAuthed } = useSession();

	//   useEffect(() => {
	//     setVoortgang(boekingDetails.verzekering ? true : false);
	//   }, [boekingDetails, setVoortgang]);

	//   useEffect(() => {
	//     setVoortgang2(boekingDetails.betaalmethode ? true : false);
	//   }, [boekingDetails, setVoortgang2]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [activeStep]);

	const handleNext = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	}, [setActiveStep]);

	const handleBack = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	}, [setActiveStep]);

	return (
		<>
			<Title title={t('titel.adv')} description='idk' />
			<NavBar selected='2' />
			<section className='relative'>
				<img
					src={foto_AdvertentiePlaatsen}
					alt='foto advertentiepagina'
					draggable='false'
					className='w-screen object-cover h-64 z-10'
				/>
				<p className='absolute top-20 text-6xl text-center schuinSchrift text-white unselectable w-full z-20'>
					{t('adv.title')}
				</p>
				<Boogjes extra='relative -mt-12 z-40' />
			</section>
			{/* {displayPage()} */}

			<div className='flex pt-8'>
				<Box sx={{ width: '75%' }} className='mx-auto'>
					<Stepper
						activeStep={activeStep}
						alternativeLabel
						connector={<ColorlibConnector />}>
						{steps.map((label, index) => {
							const stepProps = {};
							const labelProps = {};
							return (
								<Step key={label} {...stepProps}>
									<StepLabel
										StepIconComponent={ColorlibStepIcon}
										{...labelProps}>
										{label}
									</StepLabel>
								</Step>
							);
						})}
					</Stepper>
				</Box>
			</div>

			{activeStep === 0 && (
				<StandaardInfo
					setActivePage={activeStep}
					handleNext={handleNext}
					handleBack={handleBack}
				/>
			)}
			{activeStep === 1 && (
				<DatumBeschikbaar
					setActivePage={activeStep}
					handleNext={handleNext}
					handleBack={handleBack}
				/>
			)}
			{activeStep === 2 && (
				<PrijsInstellen
					setActivePage={activeStep}
					handleNext={handleNext}
					handleBack={handleBack}
				/>
			)}
			{activeStep === 3 && (
				<PreviewWoning
					setActivePage={activeStep}
					handleBack={handleBack}
				/>
			)}

			<Footer />
		</>
	);
}
