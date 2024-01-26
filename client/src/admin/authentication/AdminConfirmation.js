import { useCurrentUser } from '../AuthContext';
import Authentication from './Authentication';
import AdminLogOut from './login folder/AdminLogOut';

//when a user creates a new admin account, another admin has to verify their credibility...
//this component is meant to render the right information based on users role
const AdminConfirmation = () => {
	const { userProfile } = useCurrentUser();

	return (
		<>
			{userProfile ? (
				<>
					<div>
						You have to wait until someone verifies your account. Comeback
						later!
					</div>
					<AdminLogOut />
				</>
			) : (
				<>
					<p>you have to sign in first!</p>
					<Authentication />
				</>
			)}
		</>
	);
};

export default AdminConfirmation;
