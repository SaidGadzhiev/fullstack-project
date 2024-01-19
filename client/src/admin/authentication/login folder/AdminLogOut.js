import { useCurrentUser } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiArrowGoBackFill } from 'react-icons/ri';

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
				<RiArrowGoBackFill />

				<button type='click' onClick={handleLogOut}>
					Log out
				</button>
			</div>
		</Logout>
	);
};

const Logout = styled.div`
	position: absolute;
	bottom: 3vh;
	left: 22px;
	display: flex;
	flex-direction: row;

	&:hover {
		cursor: pointer;
	}

	button {
		font-family: var(--font-ubuntu), sans-serif;
		font-size: 1.125rem;
		font-weight: bold;
		border: none;
		background-color: transparent;
		&:hover {
			cursor: pointer;
		}
	}
	div {
		display: flex;
		align-items: center;

		svg {
			width: 20px;
			height: auto;
		}
	}
`;
export default AdminLogOut;
