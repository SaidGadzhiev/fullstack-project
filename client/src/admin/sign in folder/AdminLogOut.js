import { useCurrentUser } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogOut = () => {
	const { userProfile, setUserProfile, removeUser } = useCurrentUser();
	const navigate = useNavigate();

	const handleLogOut = () => {
		removeUser();
		navigate('/adminsignin');
	};

	return (
		<div>
			<button type='click' onClick={handleLogOut}>
				log out
			</button>
		</div>
	);
};

export default AdminLogOut;
