import { createContext, useEffect, useMemo, useState } from 'react';

export const CurrentWoningContext = createContext();

export const CurrentWoningProvider = ({ children }) => {
	const [currentInfoWoning, setcurrentInfoWoning] = useState({});
	const [isWijzigen, setIsWijzigen] = useState(false);
	// const [prijsAanpassing, setPrijsAanpassing] = useState([]);

	//als de prijsaanpassing wijzigt, de currentinfo updaten
	// useEffect(() => {
	// 	currentInfoWoning.prijsAanpassing = prijsAanpassing;
	// }, [currentInfoWoning, prijsAanpassing]);

	const values = useMemo(
		() => ({
			currentInfoWoning,
			setcurrentInfoWoning,
			isWijzigen,
			setIsWijzigen,
			// prijsAanpassing,
			// setPrijsAanpassing,
		}),
		[
			currentInfoWoning,
			setcurrentInfoWoning,
			isWijzigen,
			setIsWijzigen,
			// prijsAanpassing,
			// setPrijsAanpassing,
		]
	);

	return (
		<CurrentWoningContext.Provider value={values}>
			{children}
		</CurrentWoningContext.Provider>
	);
};
