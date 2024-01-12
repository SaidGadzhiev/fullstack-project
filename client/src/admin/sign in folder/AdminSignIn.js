import { useState } from 'react';
import fetchRequest from '../main_content/InventoryFiles/utils/fetchRequest';
import { compareUser } from './userHandler';
import { useCurrentUser } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSignIn = () => {
	const [user, setUser] = useState([]);
	const [errors, setErrors] = useState();

	const { userProfile, setUserProfile } = useCurrentUser();

	const navigate = useNavigate();

	console.log(userProfile);

	const handleInput = (value, key) => {
		console.log(key);
		setUser((prevUser) => ({ ...prevUser, [key]: value }));
	};

	console.log(user);

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const res = await fetchRequest(() => compareUser(user));
			if (!res.data) {
				setErrors(res.message);
				console.log('wrong');
			} else {
				setErrors(null);
				setUserProfile(res.data);
				if (userProfile.role === 'admin') {
					console.log('sign in');
					navigate('/admin');
				}
			}
		} catch (err) {}
	};
	return (
		<>
			{userProfile ? (
				<p>You already signed in. Go back to admin page</p>
			) : (
				<>
					<p>Sign in as Admin</p>
					<form onSubmit={(e) => handleSubmitForm(e)}>
						<div>
							<label>Email</label>
							<input
								type='email'
								name='email'
								id='email'
								onChange={(e) => handleInput(e.target.value, 'email')}
							></input>
						</div>
						<div>
							<label>Password</label>
							<input
								type='password'
								name='password'
								id='password'
								onChange={(e) => handleInput(e.target.value, 'password')}
							></input>
						</div>{' '}
						{errors && <p>{errors}</p>}
						<button type='submit'>Submit</button>
					</form>
				</>
			)}
		</>
	);
};
export default AdminSignIn;
