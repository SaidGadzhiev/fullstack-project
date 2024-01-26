import { useState } from 'react';
import fetchRequest from '../../main_content/InventoryFiles/utils/fetchRequest';
import { compareUser } from './userHandler';
import { useCurrentUser } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

//displaying the log in for existing users
const AdminLogIn = () => {
	const [user, setUser] = useState([]);
	const [errors, setErrors] = useState();

	const { userProfile, setUserProfile } = useCurrentUser();

	const navigate = useNavigate();

	const handleInput = (value, key) => {
		setUser((prevUser) => ({ ...prevUser, [key]: value }));
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const res = await fetchRequest(() => compareUser(user));
			if (!res.data) {
				setErrors(res.message);
			} else {
				setErrors(null);
				setUserProfile(res.data);

				if (res.data.role === 'admin') {
					navigate('/admin');
				}
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			{userProfile ? (
				<p>You already signed in. Go back to admin page</p>
			) : (
				<>
					<form onSubmit={(e) => handleSubmitForm(e)}>
						<div>
							<label>Email</label>
							<input
								type='email'
								name='email'
								id='email'
								required
								onChange={(e) => handleInput(e.target.value, 'email')}
							></input>
						</div>
						<div>
							<label>Password</label>
							<input
								type='password'
								name='password'
								id='password'
								required
								onChange={(e) => handleInput(e.target.value, 'password')}
							></input>
						</div>{' '}
						<button type='submit'>Login</button>
						{errors && <p>{errors}</p>}
					</form>
				</>
			)}
		</>
	);
};

export default AdminLogIn;
