import RequestSelection from './RequestSelection';
import CategorySelection from './CategorySelection';

import Profile from './Profile';
import AdminLogOut from '../authentication/login folder/AdminLogOut';

const NavSideBar = () => {
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
