import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from './AuthContext';
import { useEffect, useState } from 'react';

const LoginButton = () => {
	const { loginWithRedirect, user } = useAuth0();
	const { userProfile, setUserProfile } = useCurrentUser();
	const [pass] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!pass) {
			handleAdminKey();
		}
	}, [pass, user, setUserProfile]);

	const handleAdminKey = () => {
		if (user) {
			user.pass = 'admin';
			setUserProfile(user);

			if (user.pass === 'admin') {
				navigate('/admin');
			}
		}
	};

	return (
		!userProfile && (
			<>
				<p>Login to Dashboard</p>
				<button
					onClick={() => {
						loginWithRedirect();
					}}
				>
					Sign in on dashboard
				</button>
			</>
		)
	);
};

export default LoginButton;
