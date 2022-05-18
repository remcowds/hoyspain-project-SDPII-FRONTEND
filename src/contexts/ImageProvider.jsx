import { createContext, useCallback, useMemo, useState } from 'react';
import * as imagesAPI from '../API/images';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const POSTImage = useCallback(async ({formdata, token}) => {
		try {
			setError('');
			setLoading(true);
	
      await imagesAPI.POSTImage(formdata, token);
		} catch (error) {
			setError(error);
      console.log(error)
		} finally {
			setLoading(false);
		}
	}, []);

	const values = useMemo(
		() => ({
			images,
			loading,
			error,
			POSTImage
		}),
		[images, loading, error, POSTImage]
	);

	return (
		<ImageContext.Provider value={values}>
			{children}
		</ImageContext.Provider>
	);
};
