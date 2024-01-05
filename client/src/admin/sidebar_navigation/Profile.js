import { useCurrentUser } from '../../AuthContext';

const Profile = () => {
	const { userProfile } = useCurrentUser();

	return (
		userProfile && (
			<>
				<h1>Welcome back {userProfile.name}</h1>
			</>
		)
	);
};

export default Profile;
