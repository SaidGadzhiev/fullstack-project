import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from './AuthContext';

const LogoutButton = () => {
	const { logout } = useAuth0();
	const { userProfile, removeUser } = useCurrentUser();

	const handleLogOut = async () => {
		removeUser();
		await logout();
	};

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
