import { createContext, useContext, useState } from 'react';

export const CategoryContext = createContext(null);

export const useCurrentCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
	const [currentCategory, setCurrentCategory] = useState();

	return (
		<CategoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
			{children}
		</CategoryContext.Provider>
	);
};
