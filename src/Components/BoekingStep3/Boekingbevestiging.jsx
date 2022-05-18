import TitleStappen from "../BoekingAlgemeneItems/TitleStappen";
import ReizigerOverzicht from "./ReizigerOverzicht";
import KaartjeOverzicht from "../BoekingAlgemeneItems/KaartjeOverzicht";
import Veiligbetalen from "./Veiligbetalen";
import { useCallback, useContext } from "react";
import { BookingContext } from '../../contexts/BookingProvider';
import { useTranslation } from 'react-i18next';



export default function Boekingbevestiging({woning, reissom}) {
  const {t} = useTranslation();
  const { boekingDetails, getBookingDetail } = useContext(BookingContext);
  const {
    linkAfbeeldingen,
    naamWoning,
    regio,    
    rating,
  } = woning

  const numberToDay = useCallback((number) => {
    switch (number) {
      case 0:
				return `${t('kaart.zondag')}`;
			case 1:
				return `${t('kaart.maandag')}`;
			case 2:
				return `${t('kaart.dinsdag')}`;
			case 3:
				return `${t('kaart.woensdag')}`;
			case 4:
				return `${t('kaart.donderdag')}`;
			case 5:
				return `${t('kaart.vrijdag')}`;
			case 6:
				return `${t('kaart.zaterdag')}`;
      default:
        break;
    }
  },[]);

  

  const numberToMonth = useCallback((datum) => {
  const monthNamelist = [ "Januari", "Februari", "Maart", "April", "Mei", "Juni", "July", "Augustus", "September", "October", "November", "December" ];
    return monthNamelist[datum.getMonth()];
  },[]);
  

  return (
    <>
      <TitleStappen stap="3" label="Boekingbevestiging" />

      <div className="grid grid-cols-3 grid-rows-2">
        <div className="mx-8 ml-32 col-span-2">
          <div className="font-bold text-webgrijs text-lg">
            <span className="">{t('boeken.boekingStep3.boekingsdatum')}: </span>
            <span className="">{numberToDay(boekingDetails.datumBoeking.getDay())}, {boekingDetails.datumBoeking.getDate()} {numberToMonth(boekingDetails.datumBoeking)} {boekingDetails.datumBoeking.getFullYear()}</span>
          </div>

          <ReizigerOverzicht extra="row-span-3 col-span-2 mt-3" />
        </div>

        <KaartjeOverzicht extra='row-span-3 w-[380px]'
            aantalSterren = {rating}
            name={naamWoning}
            img={linkAfbeeldingen[0]}            
            icons="🌊+🥽+🐕"
            regio={regio}
            prijs={reissom}
          /> 

        <Veiligbetalen extra=" col-span-2 row-span-1 "/>
      </div>
    </>
  );
}
