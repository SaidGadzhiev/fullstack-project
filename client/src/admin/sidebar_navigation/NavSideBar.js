import RequestSelection from './RequestSelection';
import CategorySelection from './CategorySelection';
import LogoutButton from '../../user/sign in folder/LogoutButton';
import { useCurrentUser } from '../../AuthContext';
import Profile from './Profile';
import { NavLink } from 'react-router-dom';
import AdminLogOut from '../sign in folder/AdminLogOut';

const NavSideBar = () => {
	const { userProfile } = useCurrentUser();

	return (
		<div>
			<Profile />
			<CategorySelection />
			<RequestSelection />
			<AdminLogOut />
		</div>
	);
};

export default NavSideBar;
