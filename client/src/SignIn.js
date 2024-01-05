import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from './AuthContext';

const SignIn = () => {
	const { isLoading, error } = useAuth0();
	const { userProfile } = useCurrentUser();
	console.log(userProfile);

	return (
		<>
			{error && <p>Authentication error</p>}
			{!error && isLoading && <p>Loading...</p>}
			{!error && !isLoading && (
				<>
					<LoginButton />
					{/* <UserLoginButton /> */}
				</>
			)}
		</>
	);
};

export default SignIn;
