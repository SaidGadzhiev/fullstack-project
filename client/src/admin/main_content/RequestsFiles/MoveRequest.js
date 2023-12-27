import { useState } from 'react';
import fetchRequest from '../InventoryFiles/utils/fetchRequest';
import { updateRequest } from './handleRequests/updateRequest';
const MoveRequest = ({ request, getRequests }) => {
	const handleMoveRequest = async (e, request) => {
		e.preventDefault();
		const object = { category: 'old' };
		console.log(object);

		try {
			const res = await fetchRequest(() => updateRequest(request._id, object));
			if (!res) {
				console.log('error updating request');
			}
		} catch (err) {
			console.log(err);
		}
		getRequests();
	};
	return (
		<>
			<td>
				<button type='submit' onClick={(e) => handleMoveRequest(e, request)}>
					D
				</button>
			</td>
		</>
	);
};

export default MoveRequest;
