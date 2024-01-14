export const updateCategory = async (id, changedKeys) => {
	const result = await fetch(`/categories/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(changedKeys),
	});

	return await result.json();
};
