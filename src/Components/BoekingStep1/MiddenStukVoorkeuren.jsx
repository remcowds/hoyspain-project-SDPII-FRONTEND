import TitleStappen from "../BoekingAlgemeneItems/TitleStappen";
import AnnulatieVerzekering from "./AnnulatieVerzerking";
import HuurAuto from "./HuurAuto";
import KaartjeOverzicht from "../BoekingAlgemeneItems/KaartjeOverzicht";
import { useTranslation } from 'react-i18next';

export default function MiddenStukVoorkeuren({woning, reissom}) {
  const {
    linkAfbeeldingen,
    naamWoning,
    regio,
    rating,
  } = woning

  const {t} = useTranslation();

  
  return (
    <>
      <TitleStappen
        stap="1"
        label={t('boeken.voorkeuren')}
        bericht={t('boeken.boekingStep1.tekstOnderTitel')}
      />
      <div className="grid grid-cols-3 grid-rows-3">
        <HuurAuto extra='col-span-2' />
        <KaartjeOverzicht extra='row-span-3 w-[380px]'
            aantalSterren = {rating}
            name={naamWoning}
            img={linkAfbeeldingen[0]}            
            icons="🌊+🥽+🐕"
            regio={regio}
            prijs={reissom}
          />
  
          <AnnulatieVerzekering extra='row-span-2 col-span-2' reissom={reissom}/>
      </div>
    </>
  );
}
