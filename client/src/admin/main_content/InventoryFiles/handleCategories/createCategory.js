export const createCategory = async (item) => {
	const result = await fetch('/categories', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	});
	return await result.json();
};
