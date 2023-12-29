import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from './AuthContext';
import { useEffect } from 'react';

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();
	const { userProfile, setUserProfile, removeUser } = useCurrentUser();

	const handleLogOut = async () => {
		removeUser();
		await logout();
	};
	console.log(userProfile);

	return (
		userProfile && (
			<>
				<div>
					<h1>Log out </h1>
					<button
						onClick={() => {
							handleLogOut();
						}}
					>
						Log out
					</button>
				</div>
			</>
		)
	);
};

export default LogoutButton;
