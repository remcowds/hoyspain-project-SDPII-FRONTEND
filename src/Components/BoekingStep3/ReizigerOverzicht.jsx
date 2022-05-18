import { BsPeople } from "react-icons/bs";
import IconTitle from "../BoekingAlgemeneItems/IconTitle";
import { useSession } from "../../contexts/AuthProvider";
import { useTranslation } from 'react-i18next';


export default function ReizigerOverzicht(props) {
  const {t} = useTranslation();
  const { user } = useSession();

  return (
    <>
      <div
        className={`text-sm p-5 border-2 rounded-lg pb-20 border-weblichtgrijs h-auto ${props.extra}`}
      >
        
        <IconTitle
          icon={<BsPeople size="40" className="inline" />}
          text="Contactpersoon"
        />

        <table className="mt-5 text-left text-xl">
          <tbody className="p-6">
            <tr>
              <td className="p-3">{t('boeken.boekingStep3.naam')}</td>
              <td className="pr-3">{user.voornaam} {user.achternaam}</td>
            </tr>
            <tr>
              <td className="p-3">{t('boeken.boekingStep3.tel')}</td>
              <td className="pr-3">{user.telefoonnummer}</td>
            </tr>
            <tr>
              <td className="p-3">{t('boeken.boekingStep3.email')}</td>
              <td className="pr-3">{user.emailAdres}</td>
            </tr>            

          </tbody>
        </table>
      </div>
    </>
  );
}
