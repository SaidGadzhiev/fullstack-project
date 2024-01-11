import { useEffect, useState } from 'react';
import MoveRequest from './MoveRequest';

const NewRequests = () => {
	const [newRequests, setNewRequests] = useState([]);
	const [keys, setKeys] = useState();

	const getRequests = async () => {
		try {
			const result = await fetch('/requests');
			const parsedResult = await result.json();
			const removeOld = parsedResult.data.filter((r) => r.category !== 'old');
			setNewRequests(removeOld);
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
		setKeys(convertKeys(newRequests[0]));
	}, [newRequests]);

	return (
		<>
			<h1>New Requests</h1>
			{!newRequests || !keys ? (
				<div>hol on</div>
			) : (
				<table>
					<thead>
						<tr>
							{keys.map((column) => {
								if (column !== '_id' && column !== 'Category') {
									return <th key={column}>{column}</th>;
								}
								return null;
							})}
						</tr>
					</thead>

					<tbody>
						{newRequests.map((r) => {
							return (
								<tr key={r._id}>
									{Object.entries(r).map((key) => {
										if (key[0] !== '_id' && key[0] !== 'category')
											return <td key={key}>{key[1]}</td>;
									})}
									<MoveRequest request={r} getRequests={getRequests} />
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</>
	);
};

export default NewRequests;
