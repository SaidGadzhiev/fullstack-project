import { useState } from 'react';
import fetchRequest from '../../main_content/InventoryFiles/utils/fetchRequest';
import { compareUser } from './userHandler';
import { useCurrentUser } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

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
					<p>Login to the dashboard</p>
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
export default AdminLogIn;
