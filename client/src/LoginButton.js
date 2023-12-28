import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/admin');
	};

	return (
		!isAuthenticated && (
			<>
				<p>Login to Dashboard</p>
				<button
					onClick={() => {
						loginWithRedirect();
						handleNavigate();
					}}
				>
					Sign in
				</button>

				<p>Login as User</p>
				<button onClick={() => loginWithRedirect()}>Sign in</button>
			</>
		)
	);
};

export default LoginButton;
