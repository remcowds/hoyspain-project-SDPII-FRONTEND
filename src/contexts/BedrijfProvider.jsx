import { createContext, useCallback, useMemo, useState } from 'react';
import * as bedrijfsAPI from '../API/bedrijf';

export const BedrijfContext = createContext();

export const BedrijfProvider = ({ children }) => {
	const [BEDRIJF_DATA, setBEDRIJF_DATA] = useState([]);
	const [DIENSTEN_DATA, setDIENSTEN_DATA] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	//GET-request
	const GETBedrijven = useCallback(async (queryParams) => {
		try {
			setError('');
			setLoading(true);
			const dataDB = await bedrijfsAPI.GETbedrijven(queryParams);
			const nieuweDiensten = await bedrijfsAPI.GETdiensten();
			setDIENSTEN_DATA(nieuweDiensten);
			setBEDRIJF_DATA(dataDB.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);
	
	const GETDiensten = useCallback(async () => {
		try {
			setError('');
			setLoading(true);
			const dataDB = await bedrijfsAPI.GETdiensten();
			setDIENSTEN_DATA(dataDB);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);


	const addBedrijf = useCallback(
		async ({ formData, token }) => {
			try {
				setError('');
				setLoading(true);

				await bedrijfsAPI.addBedrijf({ formData, token });

				//verversen
				const nieuweBedrijven = await bedrijfsAPI.GETbedrijven();
				setBEDRIJF_DATA(nieuweBedrijven.data);
				const nieuweDiensten = await bedrijfsAPI.GETdiensten();
				setDIENSTEN_DATA(nieuweDiensten);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

		//DELETE-request (nog te testen)
		const verwijderBedrijf = useCallback(
			async ({bedrijfsID, token}) => {
				try {
					setError('');
					setLoading(true);
	
					const returnVal = await bedrijfsAPI.verwijderBedrijf({bedrijfsID, token});
	
					const nieuweBedrijven = await bedrijfsAPI.GETbedrijven();
					setBEDRIJF_DATA(nieuweBedrijven.data);
					const nieuweDiensten = await bedrijfsAPI.GETdiensten();
					setDIENSTEN_DATA(nieuweDiensten);
				} catch (error) {
					console.log(error)
					setError(error);
				} finally {
					setLoading(false);
				}
			},
			[]
		);


	const values = useMemo(
		() => ({
			BEDRIJF_DATA,
			loading,
			error,
			addBedrijf,
			DIENSTEN_DATA,
			GETDiensten,
			GETBedrijven,
			verwijderBedrijf
		}),
		[BEDRIJF_DATA, loading, error, DIENSTEN_DATA, addBedrijf , GETDiensten, GETBedrijven, verwijderBedrijf]
	);

	return (
		<BedrijfContext.Provider value={values}>
			{children}
		</BedrijfContext.Provider>
	);
};
