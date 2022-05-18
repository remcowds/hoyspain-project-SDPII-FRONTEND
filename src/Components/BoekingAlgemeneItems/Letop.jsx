import { useTranslation } from 'react-i18next';
export default function Letop(props) {
    const {t} = useTranslation();
    return (
        
        <div className="font-semibold text-sm text-weblichtgrijs">
            <br/>
            <span className=" font-bold text-sm text-webgrijs">
            {t('boeken.boekingStep2.letop')}:   
            </span>
             {props.letop}
        </div>

    )
}