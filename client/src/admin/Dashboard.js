import NavSideBar from './sidebar_navigation/NavSideBar';
import MainContent from './main_content/MainContent';
import { CategoryProvider } from './CategoryContext';

function Dashboard() {
	return (
		<CategoryProvider>
			<NavSideBar />
			<MainContent />
		</CategoryProvider>
	);
}

export default Dashboard;
