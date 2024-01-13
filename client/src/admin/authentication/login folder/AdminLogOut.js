import { useCurrentUser } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogOut = () => {
	const { removeUser } = useCurrentUser();
	const navigate = useNavigate();

	const handleLogOut = () => {
		removeUser();
		navigate('/authentication/');
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
