import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const ProfileOptions = () => {
	const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col">
        <div className="fixed right-0 top-14 z-40 w-56 px-2 py-1 bg-white rounded-md border-weboranje shadow-inner flex flex-col text-webgrijs">
          <div className="mb-2 mt-1">
            <div className="">
              <p className="text-gray-500 text-sm mb-2 mt-3">{t('navbar.login.registerpage')}
              <br />
              <br />
              <NavLink to="/" className="text-weboranje font-bold hover:underline inline">{t('navbar.login.here')}</NavLink> {t('navbar.login.go_back')}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProfileOptions