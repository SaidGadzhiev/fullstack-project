//update the 'deleted' new request and sets it to be the old request by simply updating its key value pair
export const updateRequest = async (id, object) => {
	const result = await fetch(`/requests/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(object),
	});

	return await result.json();
};
