export const updateItem = async (id, changedValues) => {
	const result = await fetch(`/items/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(changedValues),
	});

	return await result.json();
};
