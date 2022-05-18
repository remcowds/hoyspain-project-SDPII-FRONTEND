import KlikHier from "../BoekingAlgemeneItems/KlikHier";
import { useTranslation } from 'react-i18next';

export default function BoekingDefinitief(props) {
  const {t} = useTranslation();
  return (
    <>
      <div className={`text-base font-bold text-webgrijs mx-8 ml-32 h-auto p-2 ${props.extra}`}>
      {t('boeken.boekingStep2.definitief')}
        <div className="text-sm font-semibold text-weblichtgrijs ">
        {t('boeken.boekingStep2.tekstDefinitief1')} {<KlikHier text={t('boeken.boekingStep2.linkVoorwaarden')} to="/voorwaarden"/>} {t('boeken.boekingStep2.tekstDefinitief2')}
        </div>
      </div>
    </>
  );
}
