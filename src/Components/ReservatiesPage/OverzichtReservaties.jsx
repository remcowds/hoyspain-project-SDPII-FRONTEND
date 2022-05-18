import { useCallback, useEffect, useState } from "react";
import Woning from "../Advertentiepage/Woning";
import { GETBoekingen } from "../../API/boekingen";
import { useSession } from "../../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

const itemsPerPage = 10;

const sortNieuwste = (b1, b2) => {
  return (
    new Date(b2.datumVertrek).getTime() - new Date(b1.datumVertrek).getTime()
  );
};

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((boeking) => (
          <Woning
            key={boeking.boekingsID}
            woningID={boeking.woning.woningID}
            naamWoning={boeking.woning.naamWoning}
            linkAfbeeldingen={boeking.woning.linkAfbeeldingen}
            regio={boeking.woning.regio}
            wifi={boeking.woning.wifi}
            zwembad={boeking.woning.zwembad}
            airco={boeking.woning.airco}
            zeezicht={boeking.woning.zeezicht}
            rating={boeking.woning.rating}
            extraStyling="mx-0 my-2 h-[250px]"
            isOverzichtReservaties={true}
            boekingAankomst={new Date(boeking.datumAankomst).toLocaleDateString(
              "nl-BE"
            )}
            boekingVertrek={new Date(boeking.datumVertrek).toLocaleDateString(
              "nl-BE"
            )}
            boeking={boeking}
          />
        ))}
    </>
  );
}

export default function OverzichtReservaties() {
  const { user, isAuthed } = useSession();
  const [boekingen, setBoekingen] = useState([]);
  const {t} = useTranslation();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  //pagination: het juiste deel v/d data weergeven ---------
  useEffect(() => {
    //het juiste deel v/d woningdata weergeven
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(boekingen.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(boekingen.length / itemsPerPage));
  }, [itemOffset, boekingen]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % boekingen.length;
    setItemOffset(newOffset);
  };

  //---------------------------------

  //request voor reservaties uitvoeren
  useEffect(() => {
    if (user) {
      const get = async () => {
        const temp = await (await GETBoekingen({ userID: user.userID })).data;
        setBoekingen(temp.sort(sortNieuwste));
      };
      get();
    }
  }, [user]);

  const handleSorteer = useCallback(
    (e) => {
      if (e.target.value === "nieuwste") {
        setBoekingen([...boekingen].sort(sortNieuwste));
      } else {
        setBoekingen([...boekingen].sort(sortNieuwste).reverse());
      }
    },
    [boekingen, setBoekingen]
  );

  //redirect naar homepage indien not authed
  if (!isAuthed) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col gap-y-1 w-fit md:flex-row md:justify-between md:w-auto md:items-center mb-4">
        <h2 className="text-lg font-semibold">
          {boekingen.length} {boekingen.length===1?t('reservaties.gevonden'):t('reservaties.gevonden_plural')}
        </h2>
        <select
          onChange={handleSorteer}
          defaultValue="nieuwste"
          className="border-solid border-2 border-gray-200 rounded-md p-1"
        >
          <option key="nieuwste" value="nieuwste">
            {t('reservaties.nieuwste')}
          </option>
          <option key="oudste" value="oudste">
          {t('reservaties.oudste')}
          </option>
        </select>
      </div>
      {boekingen.length === 0 && <div className="h-screen"></div>}
	  
      <Items currentItems={currentItems} />
      <div className="flex justify-center items-center mb-10 mx-auto m-4 whitespace-nowrap">
        <ReactPaginate
          className="flex"
          pageClassName="flex mx-1"
          pageLinkClassName="border-2 p-1 px-2 rounded-md"
          activeLinkClassName="border-2 border-weboranje bg-weboranje/40"
          previousLabel={t('advertentiepagina.vorige')}
          previousClassName="flex mx-1 border-2 p-1 px-2 rounded-l-lg rounded-r-md"
          nextLabel={t('advertentiepagina.volgende')}
          nextClassName="flex mx-1 border-2 p-1 px-2 rounded-r-lg rounded-l-md"
          breakLabel="..."
          breakClassName="px-2"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          showQuickJumper={true}
        />
      </div>
    </>
  );
}
