import { useState } from 'react';
import fetchRequest from '../InventoryFiles/utils/fetchRequest';
import { updateRequest } from './handleRequests/updateRequest';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

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
				<Button type='submit' onClick={(e) => handleMoveRequest(e, request)}>
					<MdDelete />
				</Button>
			</td>
		</>
	);
};

const Button = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 1.5rem;
	opacity: 0.6;
	transition: 0.3s;
	&:hover {
		opacity: 1;
	}
`;
export default MoveRequest;
