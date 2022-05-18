import { createContext, useCallback, useMemo, useState } from 'react';
import { useSession } from "../contexts/AuthProvider";
export const VerhuurderContext = createContext();

export const VerhuurderProvider = ({ children }) => {
	const { isAuthed } = useSession();
	const [isVerhuurder, setIsverhuurder] = useState((localStorage.getItem('isVerhuurder')==="true"&&isAuthed)?true:false);
	const veranderVerhuurder = useCallback((type) => {
			setIsverhuurder(type);
      localStorage.setItem('isVerhuurder', type);
	}, []);

	

	const values = useMemo(
		() => ({
			isVerhuurder,
      veranderVerhuurder,
		}),
		[isVerhuurder, veranderVerhuurder]
	);

	return (
		<VerhuurderContext.Provider value={values}>
			{children}
		</VerhuurderContext.Provider>
	);
};
