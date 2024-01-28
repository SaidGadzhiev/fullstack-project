import NavSideBar from './sidebar_navigation/NavSideBar';
import MainContent from './main_content/MainContent';
import { CategoryProvider } from './CategoryContext';
import { useCurrentUser } from './AuthContext';
import styled from 'styled-components';
import AdminLogIn from './authentication/login folder/AdminLogIn';
import Confirmation from './authentication/AdminConfirmation';
import { useState } from 'react';

//this component renders the whole screen of the admin page including log in aswell
function Dashboard() {
	const { userProfile } = useCurrentUser();
	const [mobile, setMobile] = useState(false);

	const handleClick = () => {
		setMobile(!mobile);
		console.log(mobile);
	};

	return (
		<>
			{userProfile ? (
				<>
					{userProfile.role === 'admin' ? (
						<>
							<Toggle className='toggle' onClick={handleClick}>{`>`}</Toggle>

							<Wrapper mobile={mobile}>
								<CategoryProvider>
									<NavSideBar handleClick={handleClick} mobile={mobile} />
									<MainContent />
								</CategoryProvider>
							</Wrapper>
						</>
					) : (
						<Confirmation />
					)}
				</>
			) : (
				<>
					<AdminLogIn />
				</>
			)}
		</>
	);
}

const Toggle = styled.button`
	display: none;
	@media screen and (max-width: 1199px) {
		position: absolute;
		top: 50%;
		height: 10vh;
		display: ${(props) => (props.mobile ? 'none' : 'block')};
		background-color: transparent;
		border: none;
		font-size: 3.5rem;
		font-family: var(--font-poppins);
	}
`;

const Wrapper = styled.div`
	display: flex;

	> div:nth-child(1) {
		flex: 15%;

		height: 100vh;
		box-shadow: 6px 0px 11px 0px rgba(0, 0, 0, 0.05);
		padding-left: 20px;
		z-index: 1;
	}
	> div:nth-child(2) {
		flex: 85%;
	}

	@media screen and (max-width: 1199px) {
		> div:nth-child(1) {
			flex: ${(props) => (props.mobile ? '25%' : '10%')};
		}
		> div:nth-child(2) {
			flex: ${(props) => (props.mobile ? '75%' : '90%')};
		}

		.active {
		}

		.inactive {
			display: none;
			align-items: center;
			div {
				display: none;
			}
		}
	}

	@media screen and (max-width: 850px) {
		> div:nth-child(1) {
			flex: ${(props) => (props.mobile ? '35%' : '10%')};
		}
		> div:nth-child(2) {
			flex: ${(props) => (props.mobile ? '65%' : '90%')};
		}
	}

	@media screen and (max-width: 550px) {
		> div:nth-child(1) {
			flex: ${(props) => (props.mobile ? '60%' : '10%')};
		}
		> div:nth-child(2) {
			flex: ${(props) => (props.mobile ? '40%' : '90%')};
		}
	}
`;

export default Dashboard;
