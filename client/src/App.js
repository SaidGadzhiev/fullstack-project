import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import SignIn from './SignIn';
import { Auth0Provider } from './AuthContext';
import GlobalStyles from './GlobalStyles';
import UserPage from './user/UserPage';
import Confirmation from './user/Confirmation';

function App() {
	return (
		<Auth0Provider>
			<Router>
				<GlobalStyles />
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/admin/' element={<Dashboard />} />
					<Route path='/userpage/' element={<UserPage />} />
					<Route path='/confirmation' element={<Confirmation />} />
				</Routes>
			</Router>
		</Auth0Provider>
	);
}

export default App;
