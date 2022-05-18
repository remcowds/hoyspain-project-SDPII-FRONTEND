import React from 'react'
import { useTranslation } from 'react-i18next';
import PicturesSlideshow from './PicturesSlideshow'

const Fotogallerij = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="pt-6 pb-24 bg-weblichtoranje">
        <h3 className="font-bold text-4xl text-center pt-10 text-webgrijs">{t('home.gallery.title')}</h3>
        <h4 className="text-2xl font-semibold text-center pt-3 pb-5 text-webgrijs">{t('home.gallery.subtitle')}</h4>
        <PicturesSlideshow />
      </div>
    </>
  )
}

export default Fotogallerij