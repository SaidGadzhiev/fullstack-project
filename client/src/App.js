import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import SignIn from './SignIn';

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/admin' element={<Dashboard />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
