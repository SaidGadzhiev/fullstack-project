import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const SignIn = () => {
	const { isLoading, error } = useAuth0();

	const handleClick = () => {};

	return (
		<>
			{error && <p>Authentication error</p>}
			{!error && isLoading && <p>Loading...</p>}
			{!error && !isLoading && (
				<>
					<LoginButton />
					<p>
						<Link to='/'>
							<LogoutButton />
						</Link>
					</p>
					<Profile />
				</>
			)}
		</>
	);
};

export default SignIn;
