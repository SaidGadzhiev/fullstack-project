import { useEffect, useState } from 'react';

const OldRequests = () => {
	const [oldRequests, setOldRequests] = useState([]);
	const [keys, setKeys] = useState();

	const getRequests = async () => {
		try {
			const result = await fetch('/requests');
			const parsedResult = await result.json();
			const removeNew = parsedResult.data.filter((r) => r.category !== 'new');
			setOldRequests(removeNew);
		} catch (err) {
			console.log('error getting the requests :', err);
		}
	};

	const convertKeys = (requests) => {
		const convertedKeys = [];
		for (const key in requests) {
			if (Object.prototype.hasOwnProperty.call(requests, key)) {
				const convertedKey = key
					.replace(/([a-z])([A-Z])/g, '$1 $2') //insert space between lowercase and uppercase letter
					.replace(/([A-Z])/g, '$1') // Add space before each capital letter
					.replace(/^./, (str) => str.toUpperCase()) // Capitalize the first character
					.trim();

				convertedKeys.push(convertedKey);
			}
		}
		return convertedKeys;
	};

	useEffect(() => {
		getRequests();
	}, []);

	useEffect(() => {
		setKeys(convertKeys(oldRequests[0]));
	}, [oldRequests]);

	return (
		<>
			<h1>Previous History</h1>
			{!oldRequests || !keys ? (
				<div>hol on</div>
			) : (
				<table>
					<thead>
						<tr>
							{keys.map((column, index) => {
								if (column !== '_id' && column !== 'Category') {
									return (
										<>
											<th key={index}>{column}</th>
										</>
									);
								}
								return null;
							})}
						</tr>
					</thead>

					<tbody>
						{oldRequests.map((r, index) => {
							return (
								<>
									<tr key={index}>
										{Object.entries(r).map((key, value) => {
											if (key[0] !== '_id' && key[0] !== 'category')
												return <td key={key}>{key[1]}</td>;
										})}
									</tr>
								</>
							);
						})}
					</tbody>
				</table>
			)}
		</>
	);
};

export default OldRequests;
