
import React, { useCallback, useContext, useState } from "react";
import { BiMap } from "react-icons/bi";
import { WoningContext } from "../../../contexts/WoningProvider";
import GeefSterren from "../../Advertentiepage/GeefSterren";
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Kaart = (props) => {
  const {t} = useTranslation();
  const [redirect, setRedirect] = useState(false);
	const [navTo, setNavTo] = useState(`/huren/${props.woningID}`);

	const { setFiltersDeFormData } = useContext(WoningContext);


  const handleBekijkWoning = useCallback(() => {
    //geen requests doen als het gewoon op de preview pagina is
    console.log("yes")
    //if (!props.woningID) return;

    //form resetten -> error weg

    setFiltersDeFormData({
      regio: "",
      data: [],
      personen: "",
    });

    setNavTo(`/huren/${props.woningID}`);
		setRedirect(true);
  }, [setFiltersDeFormData, props.woningID]);

  return (
    <div className="h-[400px] w-60 md:h-[440px] md:w-[300px] bg-webwit p-4 rounded-xl shadow-md shadow-gray-400 mt-16 group relative">
      <div className="md:h-40 md:w-64 relative mx-auto">
        <img
          src={props.img}
          alt="house"
          draggable="false"
          className="w-full h-full rounded-2xl object-cover group-hover:opacity-0 duration-500"
        />
        <img
          src={props.img2}
          alt="house"
          draggable="false"
          className="absolute top-0 w-full h-full rounded-2xl object-cover opacity-0 group-hover:opacity-100 duration-500"
        />
      </div>
      <div className="p-2">
        <GeefSterren aantal={props.rating} />
      </div>
      <h3 className="font-semibold ml-1 text-2xl text-left my-1">
        {props.name}
      </h3>
      <div className="flex flex-row justify-start">
        <BiMap
          className="text-weboranje p-1 rounded-full bg-weblichtoranje"
          size="28"
        />
        <p className="text-base pl-1 mt-[2px] text-webgrijs">
          {props.location}
        </p>
      </div>
      <div className="flex justify-between text-lg mx-2">
        <div className="text-2xl md:text-3xl">
          <br />
          <p>{props.icons}</p>
        </div>
      </div>
      <div className="text-lg md:text-lg absolute right-4 bottom-14">
        <p className="text-weblichtgrijs">{t('home.ontdekkingen.from')}</p>
        <p>{props.prijs}</p>
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="md:mt-2 font-bold text-xl py-1 bg-weboranje px-14 md:px-24 rounded-xl text-webwit absolute bottom-4"
          onClick={handleBekijkWoning}
        >
          {t('home.ontdekkingen.view')}
        </button>
      </div>
      {redirect &&  `${props.woningID}` ? <Navigate to={navTo} /> : null}
    </div>
    
  );
};

export default Kaart;
