import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavSideBar from './sidebar_navigation/NavSideBar';
import MainContent from './main_content/MainContent';
import { CategoryProvider } from './CategoryContext';

function Dashboard() {
	console.log('this is dashboard');
	return (
		<CategoryProvider>
			<NavSideBar />
			<MainContent />
		</CategoryProvider>
	);
}

export default Dashboard;
