import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from '../../admin/AuthContext';

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();
	const { removeUser } = useCurrentUser();

	const handleLogOut = async () => {
		removeUser();
		await logout();
	};

	return (
		isAuthenticated && (
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
