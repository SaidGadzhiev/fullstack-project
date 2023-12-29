import RequestSelection from './RequestSelection';
import CategorySelection from './CategorySelection';
import LogoutButton from '../../LogoutButton';
import { useCurrentUser } from '../../AuthContext';
import Profile from './Profile';

const NavSideBar = () => {
	const { userProfile } = useCurrentUser();

	return (
		<>
			<Profile />
			<CategorySelection />
			<RequestSelection />
			<LogoutButton />
		</>
	);
};

export default NavSideBar;
