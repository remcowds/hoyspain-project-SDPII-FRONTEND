import React, { useCallback, useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { BiLogOut } from 'react-icons/bi';
import { FaUserEdit, FaUser } from 'react-icons/fa';
import { GiIsland } from 'react-icons/gi';
import { RiSuitcaseFill } from 'react-icons/ri';
import { GrFavorite } from 'react-icons/gr';
import { NavLink } from 'react-router-dom';
import { useLogin, useLogout, useSession } from '../../../contexts/AuthProvider';
import LabelInput from './LabelInput'
import Switcher from './Switcher'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VerhuurderContext } 

from '../../../contexts/VerhuurderProvider';
import { useTranslation } from 'react-i18next';
toast.configure()

const ProfileOptions = () => {

  const validationRules = {
    emailAdres: {
      required: true
    },
    wachtwoord: {
      required: true
    }
  };

  const methods = useForm();
  const { loading, error, isAuthed, user } = useSession();
  const { isVerhuurder, veranderVerhuurder } = useContext(VerhuurderContext);
  const login = useLogin();
  const logout = useLogout();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const {
    handleSubmit,
  } = methods;

  const handleLogin = useCallback(async () => {    
    await login(email, pwd);
  }, [login, email, pwd]);

  const handleLogout = useCallback(() => {
      logout();
      veranderVerhuurder(false);
  }, [logout]);

  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  },[])
  const handlePwd = useCallback((e) => {
    setPwd(e.target.value);
  },[])
	const { t } = useTranslation();

  return (
    <>
      {!isAuthed &&
        (
          <div className="flex flex-col">
            <div className="fixed right-0 top-14 z-40 w-72 px-4 py-2 bg-white rounded-md border-weboranje shadow-inner flex flex-col text-webgrijs">
              <form onSubmit={handleSubmit(handleLogin)}>
                
                <div className="mb-2 mt-1">
                  <div className="col-span-6 sm:col-span-3 ">
                    <label htmlFor="email" className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">{t('navbar.login.email')}</label>
                    <input
                      placeholder={t('navbar.login.email')}
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleEmail}
                      className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow"
                      />
                  </div>
                </div>
                <div className="my-2">
                  <div className="col-span-6 sm:col-span-3 ">
                    <label htmlFor="wachtwoord" className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">{t('navbar.login.pwd')}</label>
                    <input
                      placeholder={t('navbar.login.pwd')}
                      type="password"
                      id="wachtwoord"
                      name="wachtwoord"
                      onChange={handlePwd}
                      className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow"
                    />
                  </div>
                </div>

                {
                  error ? (
                    <p className="text-red-500">
                      {t('navbar.login.failed')}
                    </p>
                  ) : null
                }


                <button
                  type="submit"
                  disabled={loading}
                  className="bg-weboranje text-white font-bold px-5 py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors"
                >
                {t('navbar.login.login')}
                </button>
              </form>
              <div className="">
                <p className="text-gray-500 text-sm mb-2">{t('navbar.login.new')} <NavLink to="/register" className="text-weboranje font-bold hover:underline inline">{t('navbar.login.here')}</NavLink></p>
              </div>
            </div>

          </div>
        )
      }
      {
        isAuthed && !loading && (
          <>
            <div className="fixed right-0 top-14 z-40 w-56 px-2 py-1 bg-white rounded-md border-weboranje shadow-inner flex flex-col text-webgrijs">

              <p className="text-center w-full pt-3 pb-2">{t('navbar.login.welcome')} <b>{user.voornaam}</b></p>

              <NavLink to="/account" className="hover:underline text-center py-1 my-1"><FaUserEdit className="inline mr-1" size="20"/>{t('navbar.login.gegevens')}</NavLink>

              <NavLink to="/mijn-favorieten" className="hover:underline text-center py-1 my-1"><GrFavorite className="inline mr-1" size="20"/>{t('navbar.login.favorieten')}</NavLink>

              <NavLink to="/reservaties" className="hover:underline text-center py-1 my-1"><GiIsland className="inline mr-1" size="20"/>{t('navbar.login.mijn_reservaties')}</NavLink>
              <div className="mt-1 mb-2">
                <p className="w-full text-center -mb-1">
                {isVerhuurder?t('verhuurder'):t('huurder')}
                </p>
                <div className="flex justify-center mb-2">
                <FaUser className="inline pt-1" size="24"/><Switcher/><RiSuitcaseFill className="inline pt-1" size="24"/>
                </div>

      
              <button
                onClick={handleLogout}
                disabled={loading}
                className="bg-weboranje w-48 text-white font-bold mx-auto py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors"
              >
                <BiLogOut size="24" className="inline mr-1" />
                {t('navbar.login.afmelden')}
              </button>
            </div>
          </div>
          </>
        )
      }

    </>
  )
}

export default ProfileOptions