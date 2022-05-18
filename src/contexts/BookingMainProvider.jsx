import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useContext
  } from 'react';

  import * as bookingApi from '../API/boekingen'
  import { useSession } from './AuthProvider';
  
  export const BookingMainContext = createContext();
  export const useBooking = () => useContext(BookingMainContext);
  
  export const BookingMainProvider = ({
    children
  }) => {        
    const { ready: authReady } = useSession();
    const [booking, setBooking] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(false);
    const [currentBooking, setCurrentBooking] = useState({});
    
  
    const createBooking = useCallback(async ({
        boekingsID,
        userID,
        woningID,
        datumAankomst,
        datumVertrek,
        aantalPersonenBoeking,
        aantalNachten,
        verzekering,
        verzekeringsprijs,
        reisPrijs,
        totaalPrijs, 
    }) => {
      setError();
      setLoading(true);      
      try {    
        return await bookingApi.POSTBoeking({
            boekingsID,
            userID,
            woningID,
            datumAankomst,
            datumVertrek,
            aantalPersonenBoeking,
            aantalNachten,
            verzekering,
            verzekeringsprijs,
            reisPrijs,
            totaalPrijs,
        })                 
      } catch (error) {
        console.log(error);
        setError(error)
        throw error;
      } finally {
          setLoading(false);      
      }
    }, []); 
    
  
    const value = useMemo(() => ({
      booking,
      error,
      loading,
      currentBooking,
      createBooking,      
    }), [booking,
        error,
        loading,
        currentBooking,
        createBooking,
    ]);
  
    return ( 
    <BookingMainContext.Provider value = {value} > 
      {children} 
    </BookingMainContext.Provider>
    
    );
  };