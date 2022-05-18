import { createContext, useCallback, useMemo, useState, useContext } from "react";
import { toast } from "react-toastify";
import * as favorietenAPI from "../API/favorieten";
import * as woningenAPI from "../API/woningen";
import { WoningContext } from "./WoningProvider";


export const FavorietenContext = createContext();

export const FavorietenProvider = ({ children }) => {

  const { GETWoningenByID  } = useContext(WoningContext);
  const [FAVORIETENDATA, setFAVORIETENDATA] = useState([]);
  const [alleDataFAVORIETENDATA, setAlleDataFAVORIETEN] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //GET-request with woningID (get alle recensies v/d woning)
  const GETFavorieten = useCallback(async (userID) => {
    try {
      setError("");
      setLoading(true);      
      const dataDB = await (await favorietenAPI.GETFavorietenByUserID(userID)).data;
      const woningenIDS = dataDB.map((e) => e.woningID);
      setAlleDataFAVORIETEN(dataDB);
      const woningen = await GETWoningenByID(woningenIDS);
      setFAVORIETENDATA(woningen);
      return woningen;        
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [GETWoningenByID ]);    

  const POSTFavorieten = useCallback(
    async ({woningID, userID}) => {
      try {
        setError("");
        setLoading(true);
        await favorietenAPI.POSTFavoriet({woningID, userID});
        //recensies opnieuw ophalen
        setFAVORIETENDATA(await GETFavorieten(userID));

      } catch (error) {
        // setError(error.response.data.message);
        setError(error.response.data.message);

        toast.error("Er is iets misgegaan bij het toevoegen van deze favoriet", {
          position: toast.POSITION.BOTTOM_RIGHT,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 2000,
        });
      } finally {
        
        setLoading(false);
      }
    },
    [setError, GETFavorieten]
  );

	//DELETE-request (nog te testen)
	const deleteFavoriet = useCallback(
		async ({favorietenID, userID}) => {
			try {
        console.log(favorietenID);
				setError('');
				setLoading(true);

				const dataDB = await favorietenAPI.DELFavoriet(favorietenID);

				//verversen
        setFAVORIETENDATA(await GETFavorieten(userID));
				return dataDB;
			} catch (error) {
				setError(error);
        toast.error("Er is iets misgegaan", {
          position: toast.POSITION.BOTTOM_RIGHT,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 1500,
        });
			} finally {
				setLoading(false);
			}
		},
		[GETFavorieten]
	);

  const values = useMemo(
    () => ({
      FAVORIETENDATA,
      loading,
      error,
      GETFavorieten,  
      POSTFavorieten,
      deleteFavoriet,
      alleDataFAVORIETENDATA
    }),

    [FAVORIETENDATA, loading, error, GETFavorieten,POSTFavorieten, deleteFavoriet, alleDataFAVORIETENDATA]
  );

  return (
    <FavorietenContext.Provider value={values}>
      {children}
    </FavorietenContext.Provider>
  );
};
