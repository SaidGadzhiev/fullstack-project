const handleUserData = async (item) => {
	const result = await fetch('/requests', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	});
	return await result.json();
};
export default handleUserData;
