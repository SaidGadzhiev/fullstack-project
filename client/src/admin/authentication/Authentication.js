import { useState } from 'react';

import AdminLogIn from './login folder/AdminLogIn';
import AdminSignUp from './signup folder/AdminSignUp';
import { useCurrentUser } from '../AuthContext';
import AdminLogOut from '../authentication/login folder/AdminLogOut';

const Authentication = () => {
	const [createAccount, setCreateAccount] = useState(false);
	const { userProfile } = useCurrentUser();

	const handleSwitch = () => {
		setCreateAccount(!createAccount);
	};

	return (
		<>
			{userProfile ? (
				<>
					<p>You are already signed in!</p>
					<AdminLogOut />
				</>
			) : (
				<>
					{createAccount ? (
						<>
							<AdminSignUp />
							<button type='click' onClick={handleSwitch}>
								Login to existing account
							</button>
						</>
					) : (
						<div>
							<AdminLogIn />
							<button type='click' onClick={handleSwitch}>
								Create new account
							</button>
						</div>
					)}
				</>
			)}
		</>
	);
};
export default Authentication;
