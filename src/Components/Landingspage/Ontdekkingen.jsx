import React, { useCallback, useEffect, useState } from 'react'
import Kaart from './Ontdekkingen/Kaart'
import { useContext } from 'react';



import { WoningContext } from '../../contexts/WoningProvider';
import { useTranslation } from 'react-i18next';




const Ontdekkingen = () => {
  const {t} = useTranslation();
  const [amountList, setAmountList] = useState(5)

  const { WONING_DATA } = useContext(WoningContext);
  //detect schermgrootte
  const handleResize = () => {
    if (window.innerWidth > 1500) {
        setAmountList(5)
    } else {
      if (window.innerWidth < 1000) {
        setAmountList(1)
    }
    else{
      setAmountList(3)
    }
    }
  }

  

	

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, []);

  

  return (
    <div className=' bg-weblichtoranje font-semibold text-4xl text-center py-10 h-fit z-10'>
      Top {amountList} <div className='text-weboranje inline mt-8'>{t('home.ontdekkingen.favorites')}</div> {t('home.ontdekkingen.discoveries')}
      <div id="kaarten" className='flex flex-row justify-around gap-3 mb-14 overflow-hidden'>
      {
        WONING_DATA?.filter(e => e.rating > 3).sort(() => 0.5 - Math.random()).slice(0, amountList).map((house) =>
        {           
          return (
            <Kaart woningID={house.woningID} img={house.linkAfbeeldingen[0]} key={house.woningID} name={house.naamWoning} location={house.regio} rating={house.rating} prijs={`€ ${house.prijsPerNachtPerPersoon}`}  img2={house.linkAfbeeldingen[1]}/>
          );
        })
      }
      </div>
    </div>
  )
}

export default Ontdekkingen