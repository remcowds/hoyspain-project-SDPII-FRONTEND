import React from "react";
import { Link } from "react-router-dom";

const Vierkant = (props) => {
  return (
    <div
      className={`mx-auto hover:shadow-lg flex flex-col rounded-tl-3xl rounded-br-3xl shadow-md justify-center hover:cursor-pointer unselectable w-fit md:w-full schaduwTekst md:mx-2 text-white ${props.color}`}
    >
      <Link to={props.link}>
        <div className="flex flex-row justify-center flex-wrap text-center">
          <p className="schuinSchrift text-4xl md:text-6xl py-2 w-72">
            {props.tekst}
          </p>
          <p className="w-2"></p>
        </div>
        <img
          src={props.url}
          alt=""
          draggable="false"
          className="md:w-2/6 w-32 mx-auto mt-2 mb-2 drop-shadow-md"
        />
      </Link>
    </div>
  );
};
export default Vierkant;
