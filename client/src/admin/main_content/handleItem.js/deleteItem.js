export const deleteItem = async (_id) => {
	try {
		const result = await fetch(`/items/${_id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		if (!result.ok) {
			throw new Error('failed to delete item');
		}
		return await result.json();
	} catch (err) {
		console.error('Error deleting item:', err);
	}
};
