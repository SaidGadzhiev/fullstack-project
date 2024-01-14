export const updateItemByCat = async (id, changedKeys, currentCategory) => {
	const result = await fetch(`/items/key/category/${currentCategory}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(changedKeys),
	});

	return await result.json();
};
