const Confirmation = ({ userData }) => {
	return (
		<>
			{userData && (
				<>
					<div></div>
					<p>Hello {userData.borrowerName}</p>
					<p>Your item is ready to be picked up</p>
					<div>
						<h3>Here are some details on the item request:</h3>
						<ul>
							<li>Item: {userData.item}</li>
							<li>Serial Number: {userData.serialNumber}</li>
							<li>Reserved under: {userData.borrowerName}</li>
							<li>Email registered: {userData.email}</li>
							<li>Date: {userData.date}</li>
						</ul>
						You can pick up the item in the next 10-15 mins.
					</div>
				</>
			)}
		</>
	);
};
export default Confirmation;
