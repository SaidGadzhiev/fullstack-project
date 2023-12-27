export const createItem = async (item) => {
	const result = await fetch('/items', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	});
	return await result.json();
};
