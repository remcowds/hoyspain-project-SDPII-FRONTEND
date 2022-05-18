import { MdOutlinePayment } from "react-icons/md";
import IconTitle from "../BoekingAlgemeneItems/IconTitle";
import BetaalBlokje from "./BetaalBlokje";
import bancontact from "../../Images/Booking/bancontact.png"
import visa from "../../Images/Booking/visa.jpg"
import mastercard from "../../Images/Booking/mastercard.png"
import paypal from "../../Images/Booking/paypal-logo.png"
import { useCallback, useContext, useEffect, useState } from "react";
import { BookingContext } from "../../contexts/BookingProvider";
import { useTranslation } from 'react-i18next';

export default function Veiligbetalen(props){
  const { boekingDetails, setBookingDetails, getBookingDetail } = useContext(BookingContext);
    const [betaalmethode, setBetaalmethode] = useState(getBookingDetail("betaalmethode"));
    const {t} = useTranslation();
    const handleChanger = useCallback((naam) => {
      setBetaalmethode(naam);      
    }, []);
    
    useEffect(() => {
      
      boekingDetails.betaalmethode = betaalmethode;
      setBookingDetails("betaalmethode", betaalmethode)
    }, [betaalmethode])

    return(

        <>
        <div
        className={`text-sm p-5 border-2  mx-8 ml-32 rounded-lg pb-20 border-weblichtgrijs h-auto ${props.extra}`}
        >
        <IconTitle
          icon={<MdOutlinePayment size="40" className="inline" />}
          text={t('boeken.boekingStep3.veiligbetalen')}
        />
        <BetaalBlokje label="Bancontact/mistercash" img={bancontact} functie={handleChanger} bm={betaalmethode}/>
        <BetaalBlokje label="Visa" img={visa} functie={handleChanger} bm={betaalmethode}/>
        <BetaalBlokje label="Mastercard" img={mastercard} functie={handleChanger} bm={betaalmethode}/>
        <BetaalBlokje label="Paypal" img={paypal} functie={handleChanger} bm={betaalmethode}/>
        </div>        
        </>
    )
}