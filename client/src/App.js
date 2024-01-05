import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import SignIn from './SignIn';
import { Auth0Provider } from './AuthContext';

function App() {
	return (
		<Auth0Provider>
			<Router>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/admin/' element={<Dashboard />} />
				</Routes>
			</Router>
		</Auth0Provider>
	);
}

export default App;
