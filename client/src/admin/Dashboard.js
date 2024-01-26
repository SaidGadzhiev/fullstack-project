import NavSideBar from './sidebar_navigation/NavSideBar';
import MainContent from './main_content/MainContent';
import { CategoryProvider } from './CategoryContext';
import { useCurrentUser } from './AuthContext';
import styled from 'styled-components';
import AdminLogIn from './authentication/login folder/AdminLogIn';
import Confirmation from './authentication/AdminConfirmation';

//this component renders the whole screen of the admin page including log in aswell
function Dashboard() {
	const { userProfile } = useCurrentUser();

	return (
		<>
			{userProfile ? (
				<>
					{userProfile.role === 'admin' ? (
						<Wrapper>
							<CategoryProvider>
								<NavSideBar />
								<MainContent />
							</CategoryProvider>
						</Wrapper>
					) : (
						<Confirmation />
					)}
				</>
			) : (
				<>
					<AdminLogIn />
				</>
			)}
		</>
	);
}

const Wrapper = styled.div`
	display: flex;

	> div:nth-child(1) {
		flex: 15%;

		height: 100vh;
		box-shadow: 6px 0px 11px 0px rgba(0, 0, 0, 0.05);
		padding-left: 20px;
		z-index: 1;
	}
	> div:nth-child(2) {
		flex: 85%;
	}
`;

export default Dashboard;
