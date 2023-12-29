import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from './AuthContext';

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();
	const { userProfile, removeUser } = useCurrentUser();

	const handleLogOut = async () => {
		await logout();
		removeUser();
	};

	return userProfile && <button onClick={handleLogOut}>Sign out</button>;
};

export default LogoutButton;
