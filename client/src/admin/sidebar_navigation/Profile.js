import { useCurrentUser } from '../AuthContext';
import styled from 'styled-components';

const Profile = () => {
	const { userProfile } = useCurrentUser();

	return (
		userProfile && (
			<Username>
				<h1>Welcome back {userProfile.username}</h1>
			</Username>
		)
	);
};

const Username = styled.div`
	margin-bottom: 50px;
`;

export default Profile;
