import { createContext, useContext, useState } from 'react';

export const CategoryContext = createContext(null);

export const useCurrentCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
	const [currentCategory, setCurrentCategory] = useState();

	//changes the window for Items or Requeste depending what the user chose
	const [pathSelected, setPathSelected] = useState('');

	return (
		<CategoryContext.Provider
			value={{
				currentCategory,
				setCurrentCategory,
				pathSelected,
				setPathSelected,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};
