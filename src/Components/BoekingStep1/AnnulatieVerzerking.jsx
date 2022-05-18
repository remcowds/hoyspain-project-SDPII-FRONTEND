import IconTitle from "../BoekingAlgemeneItems/IconTitle";
import KlikHier from "../BoekingAlgemeneItems/KlikHier";
import { MdLuggage } from "react-icons/md";
import AnnulatieBlok from "./AnnulatieBlok";
import { useCallback, useContext, useEffect, useState } from "react";
import { BookingContext } from '../../contexts/BookingProvider';
import { useTranslation } from 'react-i18next';

	
export default function AnnulatieVerzekering(props) {
  const { setTheInitialBoekingDetails, getBookingDetail, boekingDetails, setBookingDetails } = useContext(BookingContext);
	const [selectedValue, setSelectedValue] = useState(getBookingDetail("verzekering"));
	const [verzekeringPrijs, setVerzekeringPrijs] = useState(getBookingDetail("verzekeringprijs"));
  const {t} = useTranslation();
  
	const handleChanger = useCallback((naam,verzekeringPrijs) => {
		setSelectedValue(naam);        
		setVerzekeringPrijs(verzekeringPrijs);   
     
	}, [setSelectedValue, setVerzekeringPrijs]);

	
  //-------------------------------------------------------------------------------------
  useEffect(() => {     
    boekingDetails.verzekering = selectedValue;
    
    setBookingDetails("verzekeringprijs", verzekeringPrijs) //stap2 uitvoeren!


	}, [verzekeringPrijs])
  

   //-------------------------------------------------------------------------------------
   

  return (
    <>
      <div className={`mx-8 ml-32 mt-10 border-2 rounded-lg border-weblichtgrijs h-auto p-4 ${props.extra}`}>
        <IconTitle
          icon={<MdLuggage size="40" className="inline" />}
          text={t('boeken.boekingStep1.annulatieTitel')}
        />
        <div className="font-bold text-xl text-webgrijs  m-5 mb-10">
        {t('boeken.boekingStep1.annulatieTekst')}&nbsp;
          {<KlikHier text={t('boeken.boekingStep1.klikHier')} to="/Voorwaarden" />}
          <br />
          <br />
          {t('boeken.boekingStep1.extraTekst')}
        </div>


        <AnnulatieBlok label={t('boeken.boekingStep1.allrisk')} percentage="9.25" value="allrisk" extra={t('boeken.boekingStep1.meestGeboekt')} hdChange={handleChanger} default={selectedValue} reissom={props.reissom}/>
        <AnnulatieBlok label={t('boeken.boekingStep1.standaard')} percentage="4.5" value="standaard" hdChange={handleChanger} default={selectedValue} reissom={props.reissom}/>
        <AnnulatieBlok label={t('boeken.boekingStep1.geen')} percentage="0" value="no" hdChange={handleChanger} default={selectedValue} reissom={props.reissom}/>
      </div>
    </>
  );
}
