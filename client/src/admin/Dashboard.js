import NavSideBar from './sidebar_navigation/NavSideBar';
import MainContent from './main_content/MainContent';
import { CategoryProvider } from './CategoryContext';
import { useCurrentUser } from '../AuthContext';

function Dashboard() {
	const { userProfile } = useCurrentUser();

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
