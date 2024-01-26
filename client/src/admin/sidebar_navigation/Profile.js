import { useCurrentUser } from '../AuthContext';
import styled from 'styled-components';

//shows the name of the user
const Profile = () => {
	const { userProfile } = useCurrentUser();

	return (
		userProfile && (
			<Username>
				<h3>Welcome back, </h3>
				<h1>{userProfile.username}</h1>
			</Username>
		)
	);
};

const Username = styled.div`
	font-family: var(--font-ubuntu);
	margin-bottom: 50px;
	h3 {
		margin-bottom: 0;
		font-weight: 400;
	}
	h1 {
		margin-top: 0;
	}
`;

export default Profile;
