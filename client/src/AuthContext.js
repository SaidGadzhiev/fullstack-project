import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const useCurrentUser = () => useContext(AuthContext);

export const Auth0Provider = ({ children }) => {
	const storedUser = localStorage.getItem('user');
	const initialUserProfile = storedUser ? JSON.parse(storedUser) : null;

	const [userProfile, setUserProfile] = useState(initialUserProfile);

	useEffect(() => {
		if (userProfile) {
			localStorage.setItem('user', JSON.stringify(userProfile));
		}
	}, [userProfile]);

	const removeUser = () => {
		setUserProfile(null);
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider value={{ userProfile, setUserProfile, removeUser }}>
			{children}
		</AuthContext.Provider>
	);
};
