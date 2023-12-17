import { useEffect, useState } from 'react';
import { createItem } from './handleItem.js/createItem';
import fetchRequest from './utils/fetchRequest';

const AddItem = ({ keys, items, setItems }) => {
	const [addItem, setAddItem] = useState({});

	//getting the keys of a selected category
	//creating an empty array for user to fill out
	useEffect(() => {
		const newItemObject = keys.reduce((acc, key) => {
			acc[key] = '';
			return acc;
		}, {});

		setAddItem(newItemObject);
	}, [keys]);

	//changing the values of the array for the item
	const handleFormChange = (e) => {
		e.preventDefault();
		const fieldName = e.target.getAttribute('name');
		const fieldValue = e.target.value;
		const newFormData = { ...addItem };
		newFormData[fieldName] = fieldValue;
		setAddItem(newFormData);
	};

	//post request to create the item
	const handleAddItemSubmit = async (e) => {
		e.preventDefault();
		const res = await fetchRequest(() => createItem(addItem));

		setItems((prevItems) => [...prevItems, addItem]);
	};

	return (
		<>
			<form>
				{keys.map((value) => {
					console.log(typeof value);
					return (
						<input
							type={`${typeof value}`}
							name={value}
							placeholder={`${value}`}
							onChange={handleFormChange}
							required='required'
						></input>
					);
				})}
				<button onClick={handleAddItemSubmit}>Add</button>
			</form>
		</>
	);
};

export default AddItem;
