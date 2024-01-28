import RequestSelection from './RequestSelection';
import CategorySelection from './CategorySelection';

import Profile from './Profile';
import AdminLogOut from '../authentication/login folder/AdminLogOut';
import styled from 'styled-components';
import { RxHamburgerMenu } from 'react-icons/rx';

//the navigation bar for the whole dashboard

const NavSideBar = ({ handleClick, mobile }) => {
	return (
		<SideBar className={` ${mobile ? 'active' : 'inactive'}`}>
			<HamburgerMenu onClick={handleClick}>{`<`}</HamburgerMenu>

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

const HamburgerMenu = styled.button`
	display: block;
	font-size: 3.5rem;
	width: 50px;
	font-family: var(--font-poppins);
	background-color: transparent;
	border: none;
	@media (min-width: 1200px) {
		display: none;
		color: red;
	}
`;

export default NavSideBar;
