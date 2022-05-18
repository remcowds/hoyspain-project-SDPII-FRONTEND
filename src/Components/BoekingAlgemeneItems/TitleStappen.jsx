import Letop from "./Letop";
import { useTranslation } from 'react-i18next';

export default function TitleStappen(props) {
  const {t} = useTranslation();
  return (
    <>
      <div className={`w-3/5 mx-8 ml-32 pt-10 ${props.extra}`}>
        <h1 className="font-bold text-2xl max-w-sm text-webgrijs">
        {t('boeken.stap')} {props.stap}: {props.label}
        </h1>
        <div className="font-semibold text-sm text-weblichtgrijs">
          {props.bericht}
        </div>
        {props.letop && (
          <Letop
            letop={props.letop}
          />
        )}
      </div>
    </>
  );
}
