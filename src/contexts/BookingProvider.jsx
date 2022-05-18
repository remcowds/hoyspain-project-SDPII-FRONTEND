import { createContext, useCallback, useMemo, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
	const [boekingDetails, setBoekingDetails] = useState({
		datumBoeking: new Date(),
		aantalGasten: null,
		datumAankomst: null,
		datumVertrek: null,		
		verzekering: null,
		verzekeringprijs:null,
		betaalmethode: null,
		reisPrijs: null,
		totaalPrijs: null,
	});
	const setTheInitialBoekingDetails = useCallback((v) => {
		setBoekingDetails(v);
	},[]);

	const setBookingDetails = useCallback((waarde, value) => {
		switch(waarde) {
			case "datumBoeking":
				setBoekingDetails(({...boekingDetails, datumBoeking:value}));
				break;
			case "aantalGasten":
				setBoekingDetails(({...boekingDetails, aantalGasten:value}));
				break;
			case "datumAankomst":
				setBoekingDetails(({...boekingDetails, datumAankomst:value}));
				break;
			case "datumVertrek":
				setBoekingDetails(({...boekingDetails, datumVertrek:value}));
				break;
			case "userID":
				setBoekingDetails(({...boekingDetails, userID:value}));
				break;
			case "verzekering":
				setBoekingDetails({...boekingDetails, verzekering:value});
				break;
			case "verzekeringprijs":
				setBoekingDetails({...boekingDetails, verzekeringprijs:value});
				break;
			case "betaalmethode":
				setBoekingDetails(({...boekingDetails, betaalmethode:value}));
				break;
			case "reisPrijs":
				setBoekingDetails(({...boekingDetails, reisPrijs:value}));
				break;
			case "totaalPrijs":
				setBoekingDetails(({...boekingDetails, totaalPrijs:value}));
				break;
			default:				
				break;
		}
	}, [boekingDetails])

	const [next, setNext] = useState(false);

	const getBookingDetail = useCallback((bd) => {
		return boekingDetails[bd]
	}, [boekingDetails])

	const setContinue = useCallback((val) => {
		setNext(val)
	}, [])

	const values = useMemo(
		() => ({
			boekingDetails,
			setBookingDetails,
			setTheInitialBoekingDetails,
			next,
			setNext,
			setContinue,
			getBookingDetail,
		}),
		[boekingDetails, setBookingDetails, setTheInitialBoekingDetails, next, setContinue,getBookingDetail,setNext]
	);


	return (
		<BookingContext.Provider value={values}>
			{children}
		</BookingContext.Provider>
	);
};
