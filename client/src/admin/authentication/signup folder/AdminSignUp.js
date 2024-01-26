import { useState } from 'react';
import fetchRequest from '../../main_content/InventoryFiles/utils/fetchRequest';
import { createUser } from '../login folder/userHandler';

//for a new admin to make an account
const AdminSignUp = () => {
	const [newUser, setNewUser] = useState([]);
	const [errors, newErrors] = useState([]);

	const handleInput = (value, key) => {
		setNewUser((prevUser) => ({ ...prevUser, [key]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//adding a role of user to make sure they're not able to see the admin panel right away
		//have to be approved by a real person first and it will be switched to 'admin' role
		setNewUser((prevUser) => ({ ...prevUser, ['role']: 'pending' }));

		try {
			const res = await fetchRequest(() => createUser(newUser));
			if (!res.data) {
				newErrors(res.errors);
			} else {
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div>
						<label>Username</label>
						<input
							type='text'
							name='username'
							id='username'
							required
							onChange={(e) => handleInput(e.target.value, 'username')}
						></input>
					</div>
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
					</div>
					<button type='submit'>Create</button>
				</form>
				{errors && (
					<>
						{errors.map((err) => {
							return (
								<div>
									{err.userError ? (
										<p>{err.userError}</p>
									) : err.passwordError ? (
										<p>{err.passwordError}</p>
									) : err.emailError ? (
										<p>{err.emailError}</p>
									) : null}
								</div>
							);
						})}
					</>
				)}
			</div>
		</>
	);
};

export default AdminSignUp;
