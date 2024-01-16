import RequestSelection from './RequestSelection';
import CategorySelection from './CategorySelection';

import Profile from './Profile';
import AdminLogOut from '../authentication/login folder/AdminLogOut';
import styled from 'styled-components';

const NavSideBar = () => {
	return (
		<SideBar>
			<Profile />
			<CategorySelection />
			<RequestSelection />
			<AdminLogOut />
		</SideBar>
	);
};

const SideBar = styled.div`
	display: flex;
	flex-direction: column;
`;

export default NavSideBar;
