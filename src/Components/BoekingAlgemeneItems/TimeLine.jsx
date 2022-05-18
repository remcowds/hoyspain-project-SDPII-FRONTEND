import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useParams } from 'react-router-dom';
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import SettingsIcon from "@mui/icons-material/Settings";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { WoningContext } from '../../contexts/WoningProvider';
import { useContext, useEffect, useState, useCallback } from 'react';
import VolgendeStap from "./VolgendeStap";

import MiddenStukVoorkeuren from "../BoekingStep1/MiddenStukVoorkeuren";
import JouwGegevens from "../BoekingStep2/JouwGegevens";
import Boekingbevestiging from "../BoekingStep3/Boekingbevestiging";
import { BookingContext } from '../../contexts/BookingProvider';
import { useSession } from "../../contexts/AuthProvider";
import GegevensKaart from "../BoekingCardForm/GegevensKaart";
import { useTranslation } from 'react-i18next';

	


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(255,151,65,1) 64%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(255,151,65,1) 64%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(239,108,0,1) 100%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(90deg, rgba(239,108,0,1) 0%, rgba(239,108,0,1) 100%, rgba(251,221,196,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%, rgba(0,0,0,1) 100%, rgba(255,255,255,1) 100%);",
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
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function TimeLine() {
  const { boekingDetails, setTheInitialBoekingDetails } = useContext(BookingContext);
  const [reissom, setReissom] = useState(boekingDetails.reisPrijs?boekingDetails.reisPrijs.toFixed(2):0);
  useEffect(() => {
    if(boekingDetails.reisPrijs)
    setReissom(boekingDetails.reisPrijs.toFixed(2));
  }, [boekingDetails])
  ;

  const { id } = useParams();

  const [voortgang, setVoortgang] = useState(false);
  const [voortgang2, setVoortgang2] = useState(false);
  const { isAuthed } = useSession();
  const [woning, setWoning] = useState();
  
  const [activeStep, setActiveStep] = useState(0);
  
  const { GETWoning, loading, error } = useContext(WoningContext);
  
  useEffect(() => {
    setVoortgang(boekingDetails.verzekering?true:false)
  }, [boekingDetails, setVoortgang]);
  
  useEffect(() => {
    setVoortgang2(boekingDetails.betaalmethode?true:false)
  }, [boekingDetails, setVoortgang2]);

  
  const {t} = useTranslation();

  const steps = [
    `${t('boeken.stap1Titel')}`,
    `${t('boeken.stap2Titel')}`,
    `${t('boeken.stap3Titel')}`,  
  ];
  
  const stepsButton = [
    `${t('boeken.beveisting')}`,
    `${t('boeken.naarPersoongegevens')}`,
    `${t('boeken.naarBevestiging')}`,  
    `${t('boeken.bevestig')}`,
  ];
  


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [setActiveStep]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, [setActiveStep]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, [setActiveStep]);

  useEffect(() => {
    async function get() {
      const woning = await GETWoning(id);
      setWoning(woning);
    }
    get();
  }, [GETWoning, id]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error...</p>;
  }

  if(!boekingDetails.reisPrijs)
  {
    return (<Navigate to='/huren' />);
  }

  if (woning) {

    return (
      <>
        <div className="flex pt-8">
          
          <Link
            className="button flex-none  hover:underline ml-8 mt-5 text-webgrijs align-middle text-3xl"
            to={`/huren/${woning.woningID}`}
          >
            <ArrowBackIosIcon />
            {woning.naamWoning}
          </Link>
          <Box sx={{ width: "75%" }} className="mx-auto">
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={<ColorlibConnector />}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      StepIconComponent={ColorlibStepIcon}
                      {...labelProps}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </div>

        {activeStep === 0 && <MiddenStukVoorkeuren woning={woning} reissom={reissom} />}        
        {activeStep === 1 && <JouwGegevens woning={woning} reissom={reissom} />}
        {activeStep === 2 && <Boekingbevestiging woning={woning} reissom={reissom} />}

        {activeStep === steps.length ? (
          <GegevensKaart/> 
          
        ) : (
          <div className=" grid place-items-center m-10">
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {t('boeken.vorigeStap')}
              </Button>

              <VolgendeStap
                naarVolgende={handleNext}
                btnLabel={stepsButton[activeStep + 1]}
                disabled={
                  (activeStep === 0 && !voortgang)||
                  (activeStep === 1 && !isAuthed)||(activeStep === 2 && !voortgang2)
                }
              >
                {activeStep === steps.length - 1 ? "Bevestigen" : "Volgende"}
              </VolgendeStap>
            </Box>
          </div>
        )}
      </>
    );
  }
  return <p>loading</p>;
}
