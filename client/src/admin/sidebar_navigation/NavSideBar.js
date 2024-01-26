import RequestSelection from './RequestSelection';
import CategorySelection from './CategorySelection';

import Profile from './Profile';
import AdminLogOut from '../authentication/login folder/AdminLogOut';
import styled from 'styled-components';

//the navigation bar for the whole dashboard
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
	background-color: #fdfdfc;
`;

export default NavSideBar;
