import Woning from "../Advertentiepage/Woning";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "../../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FavorietenContext } from "../../contexts/FavorietenProvider";
import { WoningContext } from "../../contexts/WoningProvider";
import { GETFavorietenByUserID } from "../../API/favorieten";
import { getWoningenByIDS } from "../../API/woningen";
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
				currentItems.map((woning) => (
					<Woning
						woning={woning}
						key={woning.woningID}
						linkAfbeeldingen={woning.linkAfbeeldingen}
						woningID={woning.woningID}
						naamWoning={woning.naamWoning}
						regio={woning.regio}
						wifi={woning.wifi}
						zwembad={woning.zwembad}
						airco={woning.airco}
						zeezicht={woning.zeezicht}
						rating={woning.rating}
						prijs={woning.prijsPerNachtPerPersoonHoog}
						extraStyling='bg-white'
						
					/>
				))}
    </>
  );
}

export default function MijnFavorieten() {
  
  const { FAVORIETENDATA, GETFavorieten } = useContext(FavorietenContext);
  const {t} = useTranslation();
  const { user, isAuthed } = useSession();
  const [boekingen, setBoekingen] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

 
  // useEffect(() => {    
  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(boekingen.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(boekingen.length / itemsPerPage));
  // }, [itemOffset, boekingen]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % boekingen.length;
    setItemOffset(newOffset);
  };
  
  const oproepen = useCallback( async () => {

    const deWoningen = await GETFavorieten(user.userID);
    setCurrentItems(deWoningen);

  }, [user, setCurrentItems, GETFavorieten]);

 

  
  useEffect(() => {    
    if (user) {      
      oproepen(); 
    }
  }, [oproepen]);
  
  // useEffect(() => {   
  //   let arrWoningen = [];
    
  //   // oproepen2(huizen);

  // }, [currentItems, GETWoningenByID, oproepen2]);


  //redirect naar homepage indien not authed
  if (!isAuthed) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col gap-y-1 md:flex-row md:justify-between md:w-auto md:items-center mb-4 text-center ">
        <h2 className="text-lg font-semibold text-weboranje">
          {currentItems.length} {currentItems.length===1?t('favorieten.favoriet_gevonden'):t('favorieten.favorieten_gevonden')}
        </h2>
      </div>
      {currentItems.length===0 && 
        <>
          <div className="text-xl mt-28 mx-32 text-center">{t('favorieten.voeg_favorieten_toe')}</div>
        </>
      }

      <Items currentItems={currentItems} />
      <div className="flex justify-center items-center mb-10 mx-auto m-4 whitespace-nowrap">
        <ReactPaginate
          className="flex"
          pageClassName="flex mx-1"
          pageLinkClassName="border-2 p-1 px-2 rounded-md"
          activeLinkClassName="border-2 border-weboranje bg-weboranje/40"
          previousLabel="< vorige"
          previousClassName="flex mx-1 border-2 p-1 px-2 rounded-l-lg rounded-r-md"
          nextLabel="volgende >"
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
