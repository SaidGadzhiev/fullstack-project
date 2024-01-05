import { useEffect, useState } from 'react';
import { createItem } from './handleItem.js/createItem';
import fetchRequest from './utils/fetchRequest';
import styled from 'styled-components';

const AddItem = ({ items, setSortedItems, getItems }) => {
	const [formData, newFormData] = useState();
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleView = () => {
		setIsOpen(!isOpen);
	};

	//get the keys and typeof values from sortedItems item
	const keysValues =
		items.length > 0
			? Object.entries(items[0])
					.filter(([key, value]) => key !== '_id')
					.map(([key, value]) => ({ key, type: typeof value }))
			: [];

	//make a new array only including the keys of the keysValues array
	const initialFormData = keysValues.reduce((acc, curr) => {
		acc[curr.key] = curr.key === 'category' ? items[0].category : '';
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
			category: items[0].category,
		}));
	};

	//post request to create the item
	const handleAddItemSubmit = async (e) => {
		e.preventDefault();
		setIsOpen(false);
		try {
			const res = await fetchRequest(() => createItem(formData));
			if (!res) {
				console.log('error adding item');
			}
			getItems();
			// setSortedItems((prevItems) => [...prevItems, formData]);

			newFormData(initialFormData);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{!isOpen ? (
				<button type='button' onClick={handleToggleView}>
					Add
				</button>
			) : (
				<Form onSubmit={handleAddItemSubmit}>
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
						return null;
					})}
					<button onClick={handleToggleView}>Cancel</button>
					<button>Submit</button>
				</Form>
			)}
		</>
	);
};
const Form = styled.form`
	max-width: 300px;
	width: 100%;
	background-color: #fff; /* Form background color */
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Box shadow for the form */
	z-index: 1; /* Ensure the form is above the darkened background */
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
`;

export default AddItem;
