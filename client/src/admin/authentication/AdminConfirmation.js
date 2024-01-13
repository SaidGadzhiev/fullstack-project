import { useCurrentUser } from '../AuthContext';
import Authentication from './Authentication';

const AdminConfirmation = () => {
	const { userProfile } = useCurrentUser();

	return (
		<>
			{userProfile ? (
				<div>
					You have to wait until someone verifies your account. Comeback later!
				</div>
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
