import { useEffect, useState } from 'react';
import ItemChoice from './ItemChoice';
import LogoutButton from './sign in folder/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import SignIn from './sign in folder/SignIn';

const UserPage = () => {
	const [categories, setCategories] = useState([]);
	const [chosenCat, setChosenCat] = useState();
	const [items, setItems] = useState([]);
	const { user, isAuthenticated } = useAuth0();

	const getCategories = async () => {
		const result = await fetch(`/categories/`);
		const parsedResult = await result.json();
		setCategories(parsedResult.data);
	};

	const getItems = async () => {
		try {
			const result = await fetch(`/items/key/category/${chosenCat}`);
			const parsedResult = await result.json();
			setItems(parsedResult.data);
		} catch (err) {
			console.error('error getting items:', err);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		getItems();
	}, [chosenCat]);

	const handleOptionChange = (value) => {
		setChosenCat(value);
	};

	return (
		<>
			{!isAuthenticated ? (
				<SignIn />
			) : (
				<>
					{categories.length < 1 ? (
						<>hold on</>
					) : (
						<>
							<h1>Please select the item you want to borrow</h1>

							{categories.map((cat, key) => {
								return (
									<label key={key}>
										<input
											type='radio'
											name='category'
											value={cat.name}
											onClick={(e) => handleOptionChange(e.target.value)}
										/>
										{cat.name}
									</label>
								);
							})}
							{chosenCat && <ItemChoice items={items} chosenCat={chosenCat} />}
						</>
					)}

					<LogoutButton />
				</>
			)}
		</>
	);
};

export default UserPage;
