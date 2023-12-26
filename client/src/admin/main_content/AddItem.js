import { useEffect, useState } from 'react';
import { createItem } from './handleItem.js/createItem';
import fetchRequest from './utils/fetchRequest';

const AddItem = ({ sortedItems, setSortedItems, getItems }) => {
	const [formData, newFormData] = useState();

	//get the keys and typeof values from sortedItems item
	const keysValues =
		sortedItems.length > 0
			? Object.entries(sortedItems[0])
					.filter(([key, value]) => key !== '_id')
					.map(([key, value]) => ({ key, type: typeof value }))
			: [];

	//make a new array only including the keys of the keysValues array
	const initialFormData = keysValues.reduce((acc, curr) => {
		acc[curr.key] = curr.key === 'category' ? sortedItems[0].category : '';
		return acc;
	}, {});

	useEffect(() => {
		newFormData(initialFormData);
	}, []);

	//changing the values of the array for the item for boolean condition
	const handleOptionChange = (key, value) => {
		if (value.length > 0) {
			newFormData((prevData) => ({ ...prevData, [key]: value === 'yes' }));
		}
	};

	//changing the values of the array for the item
	const handleFormChange = (key, value) => {
		newFormData((prevData) => ({ ...prevData, [key]: value }));
		newFormData((prevData) => ({
			...prevData,
			category: sortedItems[0].category,
		}));
	};

	//post request to create the item
	const handleAddItemSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetchRequest(() => createItem(formData));
			getItems();
			// setSortedItems((prevItems) => [...prevItems, formData]);

			newFormData(initialFormData);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<form onSubmit={handleAddItemSubmit}>
				{keysValues.map(({ key, type }, index) => {
					if (type === 'boolean') {
						return (
							<>
								<div>
									<p>{key}</p>
									<select
										onChange={(e) => handleOptionChange(key, e.target.value)}
										required
									>
										<option value=''>Choose</option>
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
										value={formData[key] || ''}
										onChange={(e) => handleFormChange(key, e.target.value)}
										required={true}
									></input>
								</>
							);
						}
					}
				})}
				<button>Add</button>
			</form>
		</>
	);
};

export default AddItem;
