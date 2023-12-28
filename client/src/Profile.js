import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();

	console.log(user);

	return isAuthenticated && <div></div>;
};

export default Profile;
