import styled from 'styled-components';

//rendering confirmation page
const Confirmation = ({ userData }) => {
	return (
		<>
			{userData && (
				<Content>
					<div>
						<h3>Item request details</h3>
						<ul>
							<li>Item: {userData.item}</li>
							<li>Serial Number: {userData.serialNumber}</li>
							<li>Reserved under: {userData.borrowerName}</li>
							<li>Email registered: {userData.email}</li>
							<li>Date: {userData.date}</li>
						</ul>
						You can pick up the item in the next 10-15 mins.
					</div>
				</Content>
			)}
		</>
	);
};

const Content = styled.div`
	max-width: 400px;
	width: 100%;
	background-color: white;
	padding: 30px;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	h3 {
		margin-top: 0;
	}
	ul {
		padding-left: 0;
	}
	li {
		list-style-type: none;
		margin-bottom: 10px;
	}
`;
export default Confirmation;
