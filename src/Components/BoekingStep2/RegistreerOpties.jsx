import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegister, useSession } from "../../contexts/AuthProvider";
import GridField from "../Registratie/GridField";
import { useTranslation } from 'react-i18next';

const RegistreerOpties = () => {
  const methods = useForm();

  const { handleSubmit, getValues } = methods;
  const history = useNavigate();
  const { error, isAuthed } = useSession();
  const register = useRegister();

  const {t} = useTranslation();

  const handleRegister = useCallback(
    async ({
      voornaam,
      achternaam,
      emailAdres,
      // land,
      // stad,
      // postcode,
      // straat,
      // nr,
      // bus,
      telefoonnummer,
      // geboorteDatum,
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
        toast.done("U bent succesvol geregistreerd", {
          position: toast.POSITION.BOTTOM_RIGHT,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 2000,
        });
      } else {
        toast.error(`Er is een fout opgetreden: ${error.Message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          pauseOnFocusLoss: false,
          autoClose: 5000,
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

  return (
    <>
      <div className="mt-5">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="flex flex-col md:justify-center text-weblichtgrijs">
              <div className="grid grid-cols-2 grid-flow-row gap-3 bg-webwit pt-3 p-4 md:rounded-xl pb-8">
                <h2 className="text-3xl font-bold text-center col-span-2 text-webgrijs">
                {t('registreren.title')}
                </h2>
                <div className="text-sm font-semibold text-center col-span-2 text-weblichtgrijs">
                {t('registreren.subtitle')}
                </div>

                <div className="h-[2px] bg-weboranje col-span-2 mb-5 "></div>

                <GridField
                  label="voornaam"
                  tekst="Voornaam"
                  type="text"
                  ph={t('registreren.voornaam')}
                  className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow text-gray-700"
                  validation={validationRules.voornaam}
                  cols="1"
                  icon="fa-solid fa-user icon"
                />
                <GridField
                  label="achternaam"
                  tekst="Familienaam"
                  type="text"
                  ph={t('registreren.achternaam')}
                  className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow text-gray-700"
                  validation={validationRules.achternaam}
                  cols="1"
                  icon="fa-solid fa-user icon"
                />

                <GridField
                  label="telefoonnummer"
                  tekst="Telefoonnummer"
                  type="tel"
                  ph={t('registreren.tel')}
                  className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow text-gray-700"
                  validation={validationRules.telefoonnummer}
                  cols="2"
                  icon="fa-solid fa-phone icon"
                />
                <GridField
                  label="emailAdres"
                  tekst="EmailAdres"
                  ph={t('registreren.email')}
                  type="email"
                  className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow text-gray-700"
                  validation={validationRules.emailAdres}
                  cols="2"
                  icon="fa-solid fa-envelope icon"
                />
                <GridField
                  label="wachtwoord"
                  tekst="Wachtwoord"
                  type="password"
                  ph={t('registreren.pwd')}
                  className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow text-gray-700"
                  validation={validationRules.wachtwoord}
                  cols="2"
                  icon="fa-solid fa-lock icon"
                />
                <GridField
                  label="wachtwoordHerhalen"
                  tekst="WachtwoordHerhalen"
                  ph={t('registreren.pwd2')}
                  type="password"
                  className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-weboranje focus:bg-orange-50 focus:shadow text-gray-700"
                  validation={validationRules.wachtwoordHerhalen}
                  cols="2"
                  icon="fa-solid fa-lock icon"
                />
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="bg-weboranje text-white font-bold px-5 py-2 my-2 rounded focus:outline-none shadow hover:bg-opacity-70 transition-colors"
                >
                  {t('registreren.submit')}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default RegistreerOpties;
