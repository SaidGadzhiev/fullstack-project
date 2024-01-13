import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../admin/AuthContext';
import { useEffect, useState } from 'react';

const LoginButton = () => {
	const { loginWithRedirect, user, isAuthenticated } = useAuth0();
	const { userProfile, setUserProfile } = useCurrentUser();
	const [pass] = useState(false);
	const navigate = useNavigate();

	console.log(user);

	useEffect(() => {
		if (user) {
			handlePageChange();
		}
	}, [user]);

	const handlePageChange = () => {
		navigate('/homepage');
	};

	return (
		!isAuthenticated && (
			<>
				<p>Login as user</p>
				<button
					onClick={() => {
						loginWithRedirect();
					}}
				>
					Sign in to borrow
				</button>
			</>
		)
	);
};

export default LoginButton;
