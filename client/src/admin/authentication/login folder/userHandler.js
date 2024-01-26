//request from backend to check if the user exists
export const compareUser = async (user) => {
	const result = await fetch('/user', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});
	return await result.json();
};

//request from backend to create a new user
export const createUser = async (user) => {
	const result = await fetch('/users', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});
	return await result.json();
};
