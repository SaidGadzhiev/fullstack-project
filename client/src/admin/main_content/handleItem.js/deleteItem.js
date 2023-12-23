export const deleteItem = async (_id) => {
	const result = await fetch(`/items/${_id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	return await result.json();
};
