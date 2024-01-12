import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import SignIn from './user/sign in folder/SignIn';
import { Auth0Provider } from './AuthContext';
import GlobalStyles from './GlobalStyles';
import UserPage from './user/UserPage';
import Confirmation from './user/Confirmation';
import AdminSignIn from './admin/sign in folder/AdminSignIn';

function App() {
	return (
		<Auth0Provider>
			<Router>
				<GlobalStyles />
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/adminsignin/' element={<AdminSignIn />} />
					<Route path='/admin/' element={<Dashboard />} />
					<Route path='/homepage/' element={<UserPage />} />
					<Route path='/confirmation' element={<Confirmation />} />
				</Routes>
			</Router>
		</Auth0Provider>
	);
}

export default App;
