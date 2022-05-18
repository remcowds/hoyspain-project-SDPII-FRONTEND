import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import * as woningAPI from '../API/woningen';

export const WoningContext = createContext();

export const WoningProvider = ({ children }) => {
	const [WONING_DATA, setWONING_DATA] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	//homepage 'deform' filters instellen
	const [filtersDeFormData, setFiltersDeFormData] = useState({
		regio: '',
		data: [],
		personen: '',
	});

	//GET-request (get all woningen)
	const GETWoningen = useCallback(
		async (queryParams) => {
			try {
				setError('');
				setLoading(true);

				if (!queryParams) {
					queryParams = {};
				}

				if (filtersDeFormData.regio) {
					queryParams.regio = filtersDeFormData.regio;
				}

				if (filtersDeFormData.data.length > 0) {
					queryParams.datumVan = filtersDeFormData.data[0];
					queryParams.datumTot = filtersDeFormData.data[1];
				}

				if (filtersDeFormData.personen) {
					queryParams.aantalPersonen = Number(
						filtersDeFormData.personen
					);
				}

				const dataDB = await woningAPI.GETWoningen(queryParams);
				setWONING_DATA(dataDB.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[filtersDeFormData]
	);

	//GET-request with param (get woning adhv verhuurder)
	const GETWoningenByUser = useCallback(async (userID) => {
		try {
			setError('');
			setLoading(true);
			const dataDB = await woningAPI.GETWoningenByUser(userID);
			return dataDB.data;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);

	//GET-request with id (get 1 woning)
	const GETWoning = useCallback(async (woningID) => {
		try {
			setError('');
			setLoading(true);
			const dataDB = await woningAPI.GETWoning(woningID);
			return dataDB.data;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);

	const GETWoningenByID = useCallback(async (body) => {
		try {
			setError('');
			setLoading(true);
			const dataDB = await woningAPI.getWoningenByIDS(body);
			// console.log(dataDB);
			return dataDB.data;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, []);

	//POST-request
	const addWoning = useCallback(
		async ({ formData, token }) => {
			// const { woningID, emailAdres, naamWoning, linkAfbeeldingen, adres, regio, type, prijsPerNachtPerPersoon, kopen, aantalPersonen, wifi, zeezicht, zwembad, airco, beschrijving, oppervlakte } = body;
			try {
				setError('');
				setLoading(true);

				const dataDB = await woningAPI.addWoning({ formData, token });

				//verversen
				await GETWoningen();
				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[GETWoningen]
	);

	//PUT-request (nog te testen)
	const editWoning = useCallback(
		async ({ formData, token, woningID }) => {
			try {
				setError('');
				setLoading(true);

				const dataDB = await woningAPI.editWoning({
					formData,
					token,
					woningID,
				});

				//verversen
				await GETWoningen();
				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[GETWoningen]
	);

	//DELETE-request (nog te testen)
	const removeWoning = useCallback(
		async (woningID) => {
			try {
				setError('');
				setLoading(true);

				const dataDB = await woningAPI.deleteWoning(woningID);

				//verversen
				await GETWoningen();

				return dataDB;
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[GETWoningen]
	);

	useEffect(() => {
		GETWoningen();
	}, [GETWoningen]);

	const values = useMemo(
		() => ({
			WONING_DATA,
			loading,
			error,
			GETWoningen,
			GETWoning,
			addWoning,
			editWoning,
			removeWoning,
			filtersDeFormData,
			setFiltersDeFormData,
			GETWoningenByUser,
			GETWoningenByID,
		}),
		[
			WONING_DATA,
			GETWoningenByID,
			loading,
			error,
			GETWoningen,
			GETWoning,
			addWoning,
			editWoning,
			removeWoning,
			filtersDeFormData,
			setFiltersDeFormData,
			GETWoningenByUser,
		]
	);

	return (
		<WoningContext.Provider value={values}>
			{children}
		</WoningContext.Provider>
	);
};
