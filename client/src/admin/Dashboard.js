import NavSideBar from './sidebar_navigation/NavSideBar';
import MainContent from './main_content/MainContent';
import { CategoryProvider } from './CategoryContext';
import { useCurrentUser } from '../AuthContext';
import LoginButton from '../LoginButton';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
	const { userProfile } = useCurrentUser();
	const { logout, isAuthenticated } = useAuth0();
	console.log(userProfile);

	return (
		<>
			<CategoryProvider>
				<NavSideBar />
				<MainContent />
			</CategoryProvider>
			{/* <>
					<h1>You have to log in first</h1>
					<LoginButton />
				</> */}
		</>
	);
}

export default Dashboard;
