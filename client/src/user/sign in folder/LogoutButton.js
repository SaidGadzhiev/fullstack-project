import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from '../../admin/AuthContext';
import styled from 'styled-components';
import { RiArrowGoBackFill } from 'react-icons/ri';

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();
	const { removeUser } = useCurrentUser();

	const handleLogOut = async () => {
		removeUser();
		await logout();
	};

	return (
		isAuthenticated && (
			<Btn type='click' onClick={handleLogOut}>
				<Sign className='sign'>
					<RiArrowGoBackFill />
				</Sign>
				<Text className='text'> Logout</Text>
			</Btn>
		)
	);
};
const Btn = styled.button`
	--black: #000000;
	--ch-black: #141414;
	--eer-black: #1b1b1b;
	--night-rider: #2e2e2e;
	--white: #ffffff;
	--ch-white: #e1e1e1;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 45px;
	height: 45px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	overflow: hidden;
	transition-duration: 0.3s;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
	background-color: #178080;
	position: absolute;
	bottom: 3vh;
	left: 22px;
	display: flex;

	&:hover {
		width: 125px;
		border-radius: 5px;
		transition-duration: 0.3s;
	}

	&:hover .sign {
		width: 30%;
		transition-duration: 0.3s;
	}

	&:hover .text {
		opacity: 1;
		width: 70%;
		transition-duration: 0.3s;
		padding-left: 40px;
	}

	&:active {
		transform: translate(2px, 2px);
	}
`;

const Sign = styled.div`
	width: 100%;
	transition-duration: 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		width: 20px;
		height: auto;
	}
	svg path {
		fill: #ffffff;
	}
`;

const Text = styled.div`
	position: absolute;
	right: 0%;
	width: 0%;
	opacity: 0;
	color: #ffffff;
	font-size: 1.2em;
	font-weight: 600;
	transition-duration: 0.3s;
`;

export default LogoutButton;
