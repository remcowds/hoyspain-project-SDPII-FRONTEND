import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { usePutRequestPersoon } from '../../contexts/AuthProvider';
import { useSession } from "../../contexts/AuthProvider";

const EditingTabel = ({user, onConfirmButtonHandle, onButtonHandle}) => {
  const methods = useForm();
  const [voornaam, setVN] = useState(user.voornaam);
  const [achternaam, setAN] = useState(user.achternaam);
  const [emailAdres, setEmail] = useState(user.emailAdres);
  const [telefoonnummer, setTN] = useState(user.telefoonnummer);
  const putRequest = usePutRequestPersoon();
  const { token } = useSession();

  const confirmWijzigenGegevens = useCallback(
    async () => {
      await putRequest({voornaam,achternaam,telefoonnummer,emailAdres, token, user})
      onConfirmButtonHandle(false);   
    },
    [voornaam,achternaam,telefoonnummer,emailAdres, onConfirmButtonHandle, putRequest, token, user]
  );

  const {
    handleSubmit,
  } = methods;

  const handleVN = useCallback((e) => {
    setVN(e.target.value);
  },[])

  const handleAN = useCallback((e) => {
    setAN(e.target.value);
  },[])

  const handleTN = useCallback((e) => {
    setTN(e.target.value);
  },[])

  const handleEM = useCallback((e) => {
    setEmail(e.target.value);
  },[])
  const {t} = useTranslation();
  return (
    <>
      <form onSubmit={handleSubmit(confirmWijzigenGegevens)}>
        <table className="table text-lg mb-2">
          <tbody className="">
            <tr className="">
              <td className="w-60">{t('account.voornaam')}</td>
              <td className=""><input type="text" name="voornaam" id="voornaam" defaultValue={user.voornaam} onChange={handleVN}/></td>
            </tr>
            <tr>
              <td className="">{t('account.achternaam')}</td>
              <td><input type="text" name="achternaam" id="achternaam" defaultValue={user.achternaam} onChange={handleAN}/></td>
            </tr>
            <tr>
              <td className="">{t('account.tel')}</td>
              <td><input type="tel" name="telefoonnummer" id="telefoonnummer" defaultValue={user.telefoonnummer} onChange={handleTN}/></td>
            </tr>
            <tr>
              <td className="">{t('account.email')}</td>
              <td>{user.emailAdres}</td>
            </tr>
            </tbody>
            </table>
            <div className="flex flex-row gap-2">
              <button onClick={onButtonHandle} type="button"
                          className="bg-webrood text-white font-bold px-5 py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors w-56 mx-auto"
                        >
                          {t('account.cancel')}
              </button>
              <button type="submit"
                          className="bg-weblichtgroen text-white font-bold px-5 py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors w-56 mx-auto"
                        >
                          {t('account.confirm')}
              </button>
            </div>
          </form>
  </>
  )
}

export default EditingTabel