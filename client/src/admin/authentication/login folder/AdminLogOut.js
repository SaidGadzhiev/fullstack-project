import { useCurrentUser } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CiLogout } from 'react-icons/ci';

const AdminLogOut = () => {
	const { removeUser } = useCurrentUser();
	const navigate = useNavigate();

	const handleLogOut = () => {
		removeUser();
		navigate('/authentication/');
	};

	return (
		<Logout>
			<div>
				<CiLogout />

				<button type='click' onClick={handleLogOut}>
					Log out
				</button>
			</div>
		</Logout>
	);
};

const Logout = styled.div`
	display: flex;
	flex-direction: row;

	button {
		font-family: var(--font-ubuntu), sans-serif;
		font-size: 1.125rem;
		border: none;
		background-color: transparent;
	}
	div {
		display: flex;
		align-items: center;

		svg {
			width: 25px;
			height: auto;
		}
	}
`;
export default AdminLogOut;
