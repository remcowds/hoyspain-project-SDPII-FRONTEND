import React from 'react'
import { useTranslation } from 'react-i18next';

const NormalTabel = ({user, onButtonHandle}) => {
  const {t} = useTranslation();
  return (
      <>
        <table className="table text-lg mb-2">
          <tbody className="">
            <tr className="">
              <td className="w-60">{t('account.voornaam')}</td>
              <td className="">{user.voornaam}</td>
            </tr>
            <tr>
              <td className="">{t('account.achternaam')}</td>
              <td>{user.achternaam}</td>
            </tr>
            <tr>
              <td className="">{t('account.tel')}</td>
              <td>{user.telefoonnummer}</td>
            </tr>
            <tr>
              <td className="w-60">{t('account.email')}</td>
              <td>{user.emailAdres}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={onButtonHandle}
                className="bg-weboranje text-white font-bold px-5 py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors w-56 mx-auto"
              >
                {t('account.change')}
              </button>
      </>

  )
}

export default NormalTabel