export const updateRequest = async (id, object) => {
	const result = await fetch(`/requests/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(object),
	});

	console.log(result);

	return await result.json();
};
