import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useRegister, useSession } from "../contexts/AuthProvider";
import { useCallback } from "react";
import NavBar from "../Components/Global Components/NavBar";
import GridField from "../Components/Registratie/GridField";
import Title from "../Components/Extra components/Title";
import Footer from "../Components/Global Components/Footer";
import Beach from "../Images/RegisterPage/beach.jpg";
import { toast } from "react-toastify";


import { MdPeopleAlt } from "react-icons/md";
import Boogjes from "../Components/Landingspage/Boogjes";
import { useTranslation } from "react-i18next";

const RegistratiePage = () => {
  const history = useNavigate();
  const { error, isAuthed } = useSession();
  const register = useRegister();
  const methods = useForm();
  const { handleSubmit, getValues } = methods;
  const {t} = useTranslation();
  const handleRegister = useCallback(
    async ({
      voornaam,
      achternaam,
      emailAdres,
      //land,
      //stad,
      //postcode,
      //straat,
      //nr,
      //bus,
      telefoonnummer,
      //geboorteDatum,
      wachtwoord,
    }) => {
      const success = await register({
        voornaam,
        achternaam,
        emailAdres,
        // adres:land+"%69%"+stad+"%69%"+postcode+"%69%"+straat+"%69%"+nr+"%69%"+bus,
        telefoonnummer,
        // geboorteDatum,
        wachtwoord,
      });

      if (success) {
        history("/", { replace: true });
        toast.done("U bent succesvol geregistreerd", {
          position: toast.POSITION.BOTTOM_RIGHT,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 2000,
        });
      } else {
        toast.error(`Er is een fout opgetreden: ${error}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          pauseOnFocusLoss: false,
          autoClose: 2000,
        });
      }
    },
    [history, register, error]
  );

  const validationRules = {
    voornaam: {
      required: true,
    },
    achternaam: {
      required: true,
    },
    emailAdres: {
      required: true,
    },
    telefoonnummer: {
      required: true,
    },
    // geboorteDatum: {
    //   required: true
    // },
    wachtwoord: {
      required: true,
    },
    // land: {
    //   required: true
    // },
    // straat: {
    //   required: true
    // },
    // stad: {
    //   required: true
    // },
    // nr: {
    //   required: true
    // },
    wachtwoordHerhalen: {
      required: true,
      validate: {
        notIdentical: (value) => {
          const wachtwoord = getValues("wachtwoord");

          return wachtwoord === value
            ? null
            : "Beide wachtwoorden moeten identiek zijn";
        },
      },
    },
  };

  if (isAuthed) {
    return <Navigate to="/" />;
  }
  
  return (
    <>
      <Title title={t('titel.registreren')} description="Registreer u hier" />
      <NavBar selected="99" />
      <div className="p-4 pt-28 text-webgrijs">
        
        <div className="fixed right-0 w-full top-12 -z-40">
          <img
            src={Beach}
            alt="eyecatcher"
            draggable="false"
            className="w-full -z-40 opacity-70"
          />
        </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="relative w-full h-72">
              <div className="overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 shadow-xl rounded-xl">
                  <div className="mx-auto w-fit flex flex-col justify-center overflow-hidden">            
                    <div className="grid grid-cols-2 grid-flow-row gap-3 bg-webwit pt-3 p-4 md:rounded-xl pb-8">
                      <h2 className="text-3xl font-bold text-center col-span-2 text-webgrijs">
                        {t('registreren.title')}
                      </h2>
                      <div className="text-sm font-semibold text-center col-span-2 text-weblichtgrijs">
                      {t('registreren.subtitle')}
                      </div>

                      <div className="h-[2px] bg-weboranje col-span-2 mb-5"></div>

                      <GridField
                        label="voornaam"
                        tekst="Voornaam"
                        type="text"
                        ph={t('registreren.voornaam')}
                        className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow"
                        validation={validationRules.voornaam}
                        cols="1"
                        icon="fa-solid fa-user icon"
                      />
                      <GridField
                        label="achternaam"
                        tekst="Familienaam"
                        type="text"
                        ph={t('registreren.achternaam')}
                        className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow"
                        validation={validationRules.achternaam}
                        cols="1"
                        icon="fa-solid fa-user icon"
                      />

                      <GridField
                        label="telefoonnummer"
                        tekst="Telefoonnummer"
                        type="tel"
                        ph={t('registreren.tel')}
                        className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow"
                        validation={validationRules.telefoonnummer}
                        cols="2"
                        icon="fa-solid fa-phone icon"
                      />
                      <GridField
                        label="emailAdres"
                        tekst="Emailadres"
                        type="email"
                        ph={t('registreren.email')}
                        className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow"
                        validation={validationRules.emailAdres}
                        cols="2"
                        icon="fa-solid fa-envelope icon"
                      />
                      <GridField
                        label="wachtwoord"
                        tekst="Wachtwoord"
                        type="password"
                        ph={t('registreren.pwd')}
                        className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow"
                        validation={validationRules.wachtwoord}
                        cols="2"
                        icon="fa-solid fa-lock icon"
                        sub={t('registreren.wachtwoord')}
                      />
                      <GridField
                        label="wachtwoordHerhalen"
                        tekst="Wachtwoord herhalen"
                        type="password"
                        ph={t('registreren.pwd2')}
                        className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow"
                        validation={validationRules.wachtwoordHerhalen}
                        cols="2"
                        icon="fa-solid fa-lock icon"
                      />
                  <button
                      type="submit"
                      className="bg-weboranje col-span-2 text-white font-bold px-5 w-full py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors"
                    >
                  {t('registreren.submit')}
                    </button>
                    <p className="font-bold col-span-2 text-center">{t('registreren.bestaat')} <NavLink to="/" className="underline text-weboranje">{t('registreren.inloggen')}</NavLink></p>
                    </div>

                    <div className="w-full ">
                  </div>
                  </div>
                    
                
                </div>
              </div>
              </div>
            </form>
          </FormProvider>
      </div>
			<Boogjes />
      <div className="bg-webwit h-[600px] w-full overflow-hidden"/>

      <Footer kleur="bg-webwit" />
    </>
  );
};

export default RegistratiePage;
