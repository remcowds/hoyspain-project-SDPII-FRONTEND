import TitleStappen from "../BoekingAlgemeneItems/TitleStappen";
import BoekingDefinitief from "./BoekingDefinitief";
import Persoongegevens from "./Persoongegevens";
import KaartjeOverzicht from "../BoekingAlgemeneItems/KaartjeOverzicht";
import { useTranslation } from 'react-i18next';

export default function JouwGegevens({woning, reissom}) {
  const {
    linkAfbeeldingen,
    naamWoning,    
    rating,
    regio
  } = woning;
  const {t} = useTranslation();
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-fit">
          <TitleStappen
            stap="2"
            label={t('boeken.persoongegevens')}
            bericht={t('boeken.boekingStep2.tekstOnderTitel')}
            letop={t('boeken.boekingStep2.tekstLetOp')}
            extra="float-left mb-10"
          />
          <Persoongegevens extra="float-left w-[720px]" />
          </div>
          <KaartjeOverzicht extra='min-w-[380px]'
              aantalSterren = {rating}
              name={naamWoning}
              img={linkAfbeeldingen[0]}            
              icons="🌊+🥽+🐕"
              regio={regio}
              prijs={reissom}
            /> 
          </div>
          <BoekingDefinitief extra="float-left mt-4" />
        

      </div>
    </>
  );
}
