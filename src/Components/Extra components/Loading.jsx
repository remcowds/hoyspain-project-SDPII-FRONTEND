import React from "react";
import ReactLoading from "react-loading";
import { useTranslation } from 'react-i18next';


export default function Loading({ type, color }) {
  const {t} = useTranslation();
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <ReactLoading
            type={type}
            color={color}
            height={80}
            width={80}
          />
          <p className="font-bold text-webgrijs pt-5">{t('titel.laden')}...</p>
        </div>
      </div>
    </>
  );
}
