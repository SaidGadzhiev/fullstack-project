import { useAuth0 } from '@auth0/auth0-react';
import { useCurrentUser } from '../../admin/AuthContext';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();
	const { removeUser } = useCurrentUser();

	const handleLogOut = async () => {
		removeUser();
		await logout();
	};

	return (
		isAuthenticated && (
			<>
				<>
					<Button
						onClick={() => {
							handleLogOut();
						}}
					>
						<MdArrowBackIos />
						Log out
					</Button>
				</>
			</>
		)
	);
};

const Button = styled.button`
	display: flex;
	align-items: center;
	border: none;
	background-color: transparent;
	padding: 40px;
	align-items: center;
	font-size: 1.125rem;
	font-weight: bold;
	font-family: var(--font-ubuntu);
	cursor: pointer;

	svg {
		width: 20px;
		height: auto;
	}
`;

export default LogoutButton;
