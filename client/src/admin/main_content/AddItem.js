import { useEffect, useState } from 'react';
import { createItem } from './handleItem.js/createItem';
import fetchRequest from './utils/fetchRequest';

const AddItem = ({ sortedByCategory, items, setItems }) => {
	const [formData, newFormData] = useState();

	//get the keys and typeof values from sortedByCategory item
	const keysValues =
		sortedByCategory.length > 0
			? Object.entries(sortedByCategory[0])
					.filter(([key, value]) => key !== '_id')
					.map(([key, value]) => ({ key, type: typeof value }))
			: [];

	//make a new array only including the keys of the keysValues array
	useEffect(() => {
		newFormData(
			keysValues.reduce((acc, curr) => {
				acc[curr.key] =
					curr.key === 'category' ? sortedByCategory[0].category : '';
				return acc;
			}, {})
		);
	}, []);
	console.log(formData);

	//changing the values of the array for the item for boolean condition
	const handleOptionChange = (key, value) => {
		console.log(value);
		value.length > 0
			? newFormData((prevData) => ({ ...prevData, [key]: value === 'yes' }))
			: alert('invalid input');
	};

	//changing the values of the array for the item
	const handleFormChange = (key, value) => {
		newFormData((prevData) => ({ ...prevData, [key]: value }));
		newFormData((prevData) => ({ ...prevData, category: 'cameras' }));
	};

	//post request to create the item
	const handleAddItemSubmit = async (e) => {
		e.preventDefault();
		setItems((prevItems) => [...prevItems, formData]);
		const res = await fetchRequest(() => createItem(formData));
	};

	console.log(sortedByCategory);

	return (
		<>
			<form>
				{keysValues.map(({ key, type }, index) => {
					if (type === 'boolean') {
						return (
							<>
								<div>
									<p>{key}</p>
									<select
										onChange={(e) => handleOptionChange(key, e.target.value)}
									>
										<option value='' required={true}>
											{' '}
										</option>
										<option value='yes'>Yes</option>
										<option value='no'>No</option>
									</select>
								</div>
							</>
						);
					} else {
						if (key !== 'category') {
							return (
								<>
									<p>{key}</p>
									<input
										name={key}
										placeholder={key}
										onChange={(e) => handleFormChange(key, e.target.value)}
										required={true}
									></input>
								</>
							);
						}
					}
				})}
				<button onClick={handleAddItemSubmit}>Add</button>
			</form>
		</>
	);
};

export default AddItem;
