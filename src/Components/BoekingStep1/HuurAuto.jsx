import IconTitle from "../BoekingAlgemeneItems/IconTitle";
import KlikHier from "../BoekingAlgemeneItems/KlikHier";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { useTranslation } from 'react-i18next';
export default function HuurAuto(props){
    const {t} = useTranslation();
    return (
        <>
        <div className={`mx-8 ml-32 mt-10 border-2 rounded-lg border-weblichtgrijs h-auto p-4 ${props.extra}`}>
            <IconTitle icon={<DirectionsCarFilledIcon fontSize="large"/>} text={t('boeken.boekingStep1.huurautoTitel')}/>
            <div className="font-bold text-xl text-webgrijs m-5 mb-10">
            {t('boeken.boekingStep1.tekst')} {<KlikHier text={t('boeken.boekingStep1.klikHier')} to="/Services"/>}
                <br />
                <br />
                {t('boeken.boekingStep1.extraTekst')}
                
            </div>

        </div>

        
        </>
    )
}