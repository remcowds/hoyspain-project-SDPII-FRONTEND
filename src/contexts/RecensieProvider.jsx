import { createContext, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as recensieAPI from "../API/recensies";

export const RecensieContext = createContext();

export const RecensieProvider = ({ children }) => {
  const [RECENSIE_DATA, setRECENSIE_DATA] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //GET-request with woningID (get alle recensies v/d woning)
  const GETRecensies = useCallback(async (woningID) => {
    try {
      setError("");
      setLoading(true);
      const dataDB = await recensieAPI.GETRecensiesByWoning(woningID);
      setRECENSIE_DATA(dataDB.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const POSTRecensie = useCallback(
    async (recensieBody) => {
      try {
        setError("");
        setLoading(true);
        await recensieAPI.POSTRecensie(recensieBody);
        //recensies opnieuw ophalen
        await GETRecensies(recensieBody.woningID);
      } catch (error) {
        // setError(error.response.data.message);
        setError(error.response.data.message);

        toast.error("Je hebt al een recensie op deze woning geschreven", {
          position: toast.POSITION.BOTTOM_RIGHT,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          autoClose: 2000,
        });
      } finally {
        
        setLoading(false);
      }
    },
    [setError, GETRecensies]
  );

  const values = useMemo(
    () => ({
      RECENSIE_DATA,
      loading,
      error,
      GETRecensies,
      POSTRecensie,
    }),

    [RECENSIE_DATA, loading, error, GETRecensies, POSTRecensie]
  );

  return (
    <RecensieContext.Provider value={values}>
      {children}
    </RecensieContext.Provider>
  );
};
