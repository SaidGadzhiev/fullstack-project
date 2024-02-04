import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoutButton from './LogoutButton';
import SignIn from './SignIn';
import { useAuth0 } from '@auth0/auth0-react';

const TermsAndConditions = () => {
	const [checkedTerms, setCheckedTerms] = useState(false);
	const { user, isAuthenticated } = useAuth0();

	const navigate = useNavigate();

	const handleChange = () => {
		setCheckedTerms(!checkedTerms);
	};

	const handleClick = () => {
		navigate('/homepage');
	};

	return (
		<>
			{!isAuthenticated ? (
				<SignIn />
			) : (
				<>
					<Content>
						<h3>Terms and Conditions</h3>
						<div>
							<h4>Equipment Use</h4>
							<p>Equipment is to be used for academic purposes only.</p>{' '}
							<p>
								Students are responsible for the proper use and care of the
								equipment during the borrowing period.{' '}
							</p>
							<p>
								Any damage, loss, or theft of equipment must be reported
								immediately to the lab technician
							</p>
							<p>
								Students are financially responsible for any damage or loss of
								equipment during the borrowing period.
							</p>
							<p>
								Late returns may result in penalties, including suspension of
								borrowing privileges.{' '}
							</p>
							<p>
								Students may not lend the equipment to others. If the equipment
								is lost, stolen or damaged by the other person, it is your
								responsibility to report the issue.
							</p>
							<h4>Penalties for Violation</h4>
							<p>
								Violation of the terms and conditions may result in the
								suspension of borrowing privileges.
							</p>
							<p>
								Repeat offences may lead to additional disciplinary actions, as
								determined by the GWD Department.
							</p>
							<h4>Borrowing Procedures</h4>
							<p>
								Students must fill out the Equipment Borrowing Request Form
								before picking up the equipment.
							</p>
							<p>Equipment will be lent on a first-come, first-served basis.</p>
							<p>
								The borrowing period is limited to class time only. The
								exceptions are authorised upon the teacher’s request.
							</p>
							<p>
								Before bringing back the equipment, it is the student’s
								responsibility to save all their work on another device. The
								returned equipment will be wiped off.
							</p>
							<Checkbox>
								<input
									onChange={handleChange}
									type='checkbox'
									id='checkbox'
									name='checkbox'
								/>
								<p>Accept all terms and conditions</p>
								<button
									onClick={() => {
										handleClick();
									}}
									className={checkedTerms ? 'checked learn-more' : 'learn-more'}
								>
									<span className='circle' aria-hidden='true'>
										<span className='icon arrow'></span>
									</span>
									<span className='button-text'>Continue</span>
								</button>
							</Checkbox>
						</div>
					</Content>

					<LogoutButton />
				</>
			)}
		</>
	);
};

const Content = styled.div`
	max-width: 613px;
	width: 100%;
	text-align: justify;
	margin: 0 auto;
	background-color: #ffffffcc;
	padding: 40px;
	padding-top: 20px;
	border-radius: 30px;
	margin-top: 50px;
	height: 80vh;
	overflow: auto;
	box-shadow: 0px -4px 10px 2px rgba(0, 0, 0, 0.07);

	@media screen and (max-width: 650px) {
		max-width: 230px;
		width: 100%;
		margin-top: 5vh;
	}

	::-webkit-scrollbar {
		background-color: black;
	}

	h4 {
		margin-bottom: -5px;
	}

	button {
		pointer-events: none;
		cursor: not-allowed;
		opacity: 0.6;
		transition: 0.3s;
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
		margin-top: 3px;
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
	.checked {
		pointer-events: all;
		cursor: pointer;
		opacity: 1;
	}
`;

const Checkbox = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	input {
		margin-right: 25px;
	}
	p {
		margin-right: 60px;
	}
`;

export default TermsAndConditions;
