import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from './AuthContext';

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();

	const { userProfile, updateUser } = useCurrentUser();

	console.log(userProfile);

	return userProfile && <div>you're signed it</div>;
};

export default Profile;
