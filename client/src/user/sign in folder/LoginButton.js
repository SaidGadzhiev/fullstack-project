import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../../assets/logo.svg';
import styled from 'styled-components';

const LoginButton = () => {
	const { loginWithRedirect, user, isAuthenticated } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			handlePageChange();
		}
	}, [user]);

	const handlePageChange = () => {
		navigate('/homepage');
	};

	return (
		!isAuthenticated && (
			<Content>
				<img src={logo} alt='logo of antventory' />
				<Line></Line>
				<button
					onClick={() => {
						loginWithRedirect();
					}}
					className='learn-more'
				>
					<span class='circle' aria-hidden='true'>
						<span class='icon arrow'></span>
					</span>
					<span class='button-text'> Borrow</span>
				</button>
			</Content>
		)
	);
};

const Content = styled.div`
	display: flex;
	margin: 0 auto;
	height: 99vh;
	width: 600px;
	justify-content: space-around;
	align-items: center;

	img {
		max-width: 250px;
		width: 100%;
		height: auto;
		pointer-events: none;
	}

	button {
		position: relative;
		display: inline-block;
		cursor: pointer;
		outline: none;
		border: 0;
		vertical-align: middle;
		text-decoration: none;
		background: transparent;
		padding: 0;
		font-size: inherit;
		font-family: inherit;
		width: 12rem;
		height: auto;
	}

	button.learn-more .circle {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		position: relative;
		display: block;
		margin: 0;
		width: 3rem;
		height: 3rem;
		background: #178080;
		border-radius: 0.4rem;
	}

	button.learn-more .circle .icon {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		background: #fff;
	}

	button.learn-more .circle .icon.arrow {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		left: 0.625rem;
		width: 1.125rem;
		height: 0.125rem;
		background: none;
	}

	button.learn-more .circle .icon.arrow::before {
		position: absolute;
		content: '';
		top: -0.29rem;
		right: 0.0625rem;
		width: 0.625rem;
		height: 0.625rem;
		border-top: 0.125rem solid #fff;
		border-right: 0.125rem solid #fff;
		transform: rotate(45deg);
	}

	button.learn-more .button-text {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0.75rem 0;
		margin: 0 0 0 1.85rem;
		color: #178080;
		font-weight: 700;
		line-height: 1.6;
		text-align: center;
		text-transform: uppercase;
	}

	button:hover .circle {
		width: 100%;
	}

	button:hover .circle .icon.arrow {
		background: #fff;
		transform: translate(1rem, 0);
	}

	button:hover .button-text {
		color: #fff;
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

export default LoginButton;
