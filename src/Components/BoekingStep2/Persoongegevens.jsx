import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconTitle from "../BoekingAlgemeneItems/IconTitle";
import Radio from "@mui/material/Radio";
import { useCallback, useEffect, useState } from 'react';
import KlikHier from "../BoekingAlgemeneItems/KlikHier";
import { useSession } from "../../contexts/AuthProvider";
import {RiArrowDropDownLine,RiArrowDropUpLine} from 'react-icons/ri';
import RegistreerOpties from "./RegistreerOpties";
import { useTranslation } from 'react-i18next';


export default function Persoongegevens(props) {
  const [open, setOpen] = useState(false);
  const [naam, setNaam] = useState(["",""]);
  const {t} = useTranslation();

  const handleClickRegister = useCallback(() => {
    setOpen(!open);
  },[open]);  
  const { loading, isAuthed, user } = useSession();

  useEffect(() => {
    setNaam([user?user.voornaam:"",user?user.achternaam:""])
  },[user])


  return (
    <>
      <div
        className={`mx-8 ml-32 border-2 rounded-lg border-weblichtgrijs h-fit p-4 ${props.extra}`}
      >
        <IconTitle
          icon={<AccountBoxIcon fontSize="large" />}
          text={t('boeken.boekingStep2.persoongegevensTitel')}
        />
        <div className="text-base text-weblichtgrijs m-5 mb-10">
        {t('boeken.boekingStep2.tekstPersoongegevens')}
        </div>
        {isAuthed && (
          <div className="text-xl font-normal text-webgrijs m-5">
            {t('boeken.boekingStep2.aangemeld')} {naam[0]} {naam[1]}<b></b>.
          </div>
        )}

        {!isAuthed && (
          <>
            <div className="text-xl font-semibold text-weblichtgrijs m-5" onClick={handleClickRegister}>
            {t('boeken.boekingStep2.accountMaken')}
              <div className="cursor-pointer w-fit">
              <b className="text-weboranje underline">{t('boeken.boekingStep2.registreeerUHier')}</b>{open && <RiArrowDropUpLine className="inline text-weboranje" size="28"/>}{!open && <RiArrowDropDownLine className="inline text-weboranje" size="28"/>}
              </div>
            </div>
            {open && (
            <RegistreerOpties/>
            )}
          </>
        )}
        {isAuthed && !loading && (
          <>
            <p className="ml-5">{t('boeken.boekingStep2.info')}</p>
          </>
        )}
      </div>
    </>
  );
}
