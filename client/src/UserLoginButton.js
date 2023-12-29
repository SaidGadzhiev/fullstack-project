import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from './AuthContext';
import { useCallback, useEffect, useState } from 'react';

const UserLoginButton = () => {
	const { loginWithRedirect, isAuthenticated, user } = useAuth0();
	const { userProfile, setUserProfile } = useCurrentUser();
	const navigate = useNavigate();

	useEffect(() => {
		handleUser();
	}, [user, setUserProfile]);

	const handleUser = () => {
		if (user) {
			user.pass = 'user';
			setUserProfile(user);
			console.log(user);

			if (user.pass === 'user') {
				navigate('/');
			}
		}
	};

	return (
		!userProfile && (
			<>
				<p>Login as User</p>
				<button onClick={() => loginWithRedirect()}>Sign in</button>
			</>
		)
	);
};

export default UserLoginButton;
