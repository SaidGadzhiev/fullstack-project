import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import SignIn from './user/sign in folder/SignIn';
import { Auth0Provider } from './admin/AuthContext';
import GlobalStyles from './GlobalStyles';
import UserPage from './user/UserPage';
import AdminConfirmation from './admin/authentication/AdminConfirmation';
import PageNotFound from './PageNotFound';
import Authentication from './admin/authentication/Authentication';

function App() {
	return (
		<Auth0Provider>
			<Router>
				<GlobalStyles />
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/role-confirmation/' element={<AdminConfirmation />} />
					<Route path='/admin/' element={<Dashboard />} />
					<Route path='/authentication' element={<Authentication />} />
					<Route path='/homepage/' element={<UserPage />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</Router>
		</Auth0Provider>
	);
}

export default App;
