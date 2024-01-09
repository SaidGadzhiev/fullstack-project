import { useEffect, useState } from 'react';
import ItemChoice from './ItemChoice';

const UserPage = () => {
	const [categories, setCategories] = useState([]);
	const [chosenCat, setChosenCat] = useState();
	const [items, setItems] = useState([]);

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
			{categories.length < 1 ? (
				<>hold on</>
			) : (
				<>
					<h1>Please select the item you want to borrow</h1>

					{categories.map((cat, key) => {
						return (
							<>
								<label key={key}>
									<input
										type='radio'
										name='category'
										value={cat.name}
										onClick={(e) => handleOptionChange(e.target.value)}
									/>
									{cat.name}
								</label>
							</>
						);
					})}
					{chosenCat && <ItemChoice items={items} chosenCat={chosenCat} />}
				</>
			)}
		</>
	);
};

export default UserPage;
