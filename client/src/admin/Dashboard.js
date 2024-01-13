import NavSideBar from './sidebar_navigation/NavSideBar';
import MainContent from './main_content/MainContent';
import { CategoryProvider } from './CategoryContext';
import { useCurrentUser } from './AuthContext';
import styled from 'styled-components';
import AdminLogIn from './authentication/login folder/AdminLogIn';
import Confirmation from './authentication/AdminConfirmation';

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
					<p>You have to log in first!</p>
					<AdminLogIn />
				</>
			)}
		</>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;

	> div:nth-child(1) {
		flex: 10%;
		max-width: 296px;
		width: 100%;
	}
	> div:nth-child(2) {
		flex: 70%;
		max-width: 1000px;
		width: 100%;
	}
`;

export default Dashboard;
