export const updateNotification = async () => {
	const result = await fetch(`/notification`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

	return await result.json();
};
