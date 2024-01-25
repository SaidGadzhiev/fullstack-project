import { useState } from 'react';

import AdminLogIn from './login folder/AdminLogIn';
import AdminSignUp from './signup folder/AdminSignUp';
import { useCurrentUser } from '../AuthContext';
import AdminLogOut from '../authentication/login folder/AdminLogOut';
import logo from '../../assets/logo.svg';
import styled from 'styled-components';

const Authentication = () => {
	const [createAccount, setCreateAccount] = useState(false);
	const { userProfile } = useCurrentUser();

	const handleSwitch = () => {
		setCreateAccount(!createAccount);
	};

	return (
		<>
			{userProfile ? (
				<>
					<p>You are already signed in!</p>
					<AdminLogOut />
				</>
			) : (
				<Content>
					{createAccount ? (
						<div>
							<AdminSignUp />
							<button type='click' onClick={handleSwitch}>
								Login to existing account
							</button>
						</div>
					) : (
						<div>
							<AdminLogIn />
							<button type='click' onClick={handleSwitch}>
								Create new account
							</button>
						</div>
					)}
				</Content>
			)}
		</>
	);
};

const Content = styled.div`
	display: flex;
	flex-direction: row;
	width: 600px;
	height: 99vh;
	margin: 0 auto;
	align-items: center;
	justify-content: space-around;

	img {
		max-width: 250px;
		width: 100%;
		height: auto;
		pointer-events: none;
	}
	div {
	}

	button {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: 140px;
		height: 50px;
		background-color: transparent;
		color: #178080;
		font-weight: 700;
		font-size: 1rem;
		border: none;
		cursor: pointer;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	form {
		font-family: var(--font-poppins);

		div {
			display: flex;
			flex-direction: row;
			margin-bottom: 20px;
			label {
				width: 40%;
			}
			input {
				width: 60%;
				font-family: var(--font-poppins);
				font-size: 1rem;
				border-radius: 5px;
				border: 1px solid #17808042;
			}
		}
	}

	div p,
	p {
		text-align: center;
		color: red;
	}
`;

const Line = styled.span`
	display: inline-block;
	width: 2px; /* Adjust the width of the line */
	max-height: 75px; /* Adjust the thickness of the line */
	height: 100%;
	background-color: #178080; /* Adjust the color of the line */
	border-radius: 10px;
`;
export default Authentication;
