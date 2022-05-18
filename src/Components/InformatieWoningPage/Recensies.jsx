import { AiFillStar } from "react-icons/ai";
import Recensie from "./Recensie";
import { RecensieContext } from "../../contexts/RecensieProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { useSession } from "../../contexts/AuthProvider";
import React from "react";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useTranslation } from "react-i18next";

export default function Recensies(props) {
  const { woningID, rating } = props;

  const { POSTRecensie, GETRecensies, RECENSIE_DATA } =
    useContext(RecensieContext);
  const { t } = useTranslation();

  const [showModal, setShowModal] = React.useState(false);
  const aantalRecensies = RECENSIE_DATA.length;
  const { isAuthed, user } = useSession();

  useEffect(() => {
    GETRecensies(woningID);
  }, [GETRecensies, woningID]);

  const { register, handleSubmit, reset } = useForm();

  const labels = {
    1: "Ondermaats",
    2: "Kon beter",
    3: "Goed",
    4: "Uitstekend",
    5: "Briljant",
  };

  function getLabelText(value) {
    return ` ${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);

  const [perpersoon, setPerpersoon] = useState(true);

  const submit = useCallback(
    async (data) => {
      try {
        const datumBeoordeling = new Date();
        const userID = user.userID;

        const recensieBody = {
          beoordelingsID: uuid(),
          woningID,
          userID,
          aantalSterren: value,
          datumBeoordeling,
          ...data,
        };

        //post doen
        await POSTRecensie(recensieBody);

        //form resetten
        reset();
        setShowModal(false);

        //naar top v/d recensies scrollen
        document.getElementById("recensies").scrollIntoView();
      } catch (error) {
        console.log("error", error);
      }
    },
    [reset, user, woningID, POSTRecensie, value]
  );

  return (
    <section id="recensies" className="mt-6 mx-auto px-6 mb-10 scroll-mt-24">
      <div className="flex items-center w-full gap-1">
        <AiFillStar size="30" className="pr-1 text-weboranje" />
        <span className="font-bold text-lg underline">
          {t("informatieWoning.recensies.reviews")}:
        </span>
        <span className="font-bold text-lg">
          {t("informatieWoning.recensies.aantal")}: {aantalRecensies} -{" "}
          {t("informatieWoning.recensies.gemiddelde")}.: {rating}
        </span>

        <button
          className={`bg-weboranje w-10 h-10 rounded-xl text-white text-3xl ml-auto mr-10 p-1 ${
            isAuthed && perpersoon ? "" : "bg-weblichtgrijs"
          }`}
          disabled={isAuthed && perpersoon ? false : true}
          onClick={() => setShowModal(true)}
        >
          <RiAddLine size="2xl" color="white" />
        </button>
      </div>
      <div className="flex flex-wrap gap-x-4">
        {/* hier mappen naar recensies */}
        {RECENSIE_DATA.map((recensie) => (
          <Recensie
            key={recensie.beoordelingsID}
            voornaam={recensie.voornaam}
            achternaam={recensie.achternaam}
            tekst={recensie.tekst}
            aantalSterren={recensie.aantalSterren}
            datumBeoordeling={recensie.datumBeoordeling}
          />
        ))}
      </div>
      {showModal ? (
        <>
          {isAuthed && perpersoon ? (
            <>
              <div
                className="bg-black opacity-40 w-full h-screen fixed top-0 left-0 z-[60] duration-100"
                onClick={() => setShowModal(false)}
              />
              <form
                onSubmit={handleSubmit(submit)}
                className="outline-none focus:outline-none z-[61] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
                  <div className="py-3">
                    <div className="bg-white min-w-1xl flex flex-col shadow-lg rounded-lg overflow-hidden">
                      <div className="px-12 py-5">
                        <h2 className="text-webgrijs text-3xl font-semibold">
                          Jouw mening telt!
                        </h2>
                      </div>
                      <div className="bg-gray-200 w-full flex flex-col items-center">
                        <div className="flex flex-col items-center py-6 space-y-3">
                          <span className="text-lg text-gray-800">
                            Hoe was jouw vakantie?
                          </span>
                          <div className="flex flex-col justify-center text-center">
                            <Rating
                              name="aantalSterren"
                              id="aantalSterren"
                              value={value}
                              precision={1}
                              getLabelText={getLabelText}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                              onChangeActive={(event, newHover) => {
                                setHover(newHover);
                              }}
                              defaultValue={0}
                              size="large"
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize=""
                                />
                              }
                            />
                            {value !== null && (
                              <div className="text-weboranje font-bold">
                                {labels[hover !== -1 ? hover : value]}
                              </div>
                            )}
                          </div>

                          <div className="w-64 flex flex-col">
                            <textarea
                              rows="4"
                              className="p-4 text-gray-500 rounded-xl resize-none"
                              id="tekst"
                              name="tekst"
                              placeholder="Laat een bericht achter, kijk terug op jouw vakantie!"
                              required
                              {...register("tekst")}
                            />

                            <input
                              type="submit"
                              value="Plaats recensie"
                              className=" py-3 my-8 text-lg cursor-pointer bg-weboranje rounded-md text-white hover:shadow-inner
            hover:shadow-orange-700"
                            />
                          </div>
                        </div>
                        <div className="h-20 flex items-center justify-center">
                          <button
                            href="#"
                            className="text-gray-600"
                            onClick={() => setShowModal(false)}
                          >
                            Misschien later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
