import { useEffect, useState } from 'react';
import { createItem } from './handleItem.js/createItem';
import fetchRequest from './utils/fetchRequest';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';

const _ = require('lodash');

const AddItem = ({ items, getItems, category }) => {
	const [formData, newFormData] = useState();
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleView = () => {
		setIsOpen(!isOpen);
	};

	//change the key syntax to camel case
	//to pass that as a key to a new item
	function convertKeysToCamelCase(obj) {
		return _.map(obj, (value) => {
			const camelCaseKey = _.camelCase(value.key);
			return { key: camelCaseKey, type: value.type };
		});
	}

	const camelCaseObject = category
		? convertKeysToCamelCase(category.attributes)
		: [];

	//make a new array only including the keys of the keysValues array
	const initialFormData = camelCaseObject.reduce((acc, curr) => {
		acc[curr.key] = curr.key === 'category' ? items[0].category : '';
		return acc;
	}, {});

	useEffect(() => {
		newFormData(initialFormData);
	}, [category]);

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
			category: category.name,
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
				<AddButton type='button' onClick={handleToggleView}>
					<FiPlus />
					Add Items
				</AddButton>
			) : (
				<>
					<Overlay></Overlay>
					<Form onSubmit={handleAddItemSubmit}>
						{camelCaseObject.map(({ key, type }) => {
							if (type === 'boolean') {
								return (
									<div key={key}>
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
								);
							} else {
								if (key !== 'category') {
									return (
										<div key={key}>
											<p>{key}</p>
											<input
												name={key}
												placeholder={key}
												value={formData[key] || ''}
												onChange={(e) => handleFormChange(key, e.target.value)}
												required={true}
											></input>
										</div>
									);
								}
							}
							return null;
						})}
						<button onClick={handleToggleView}>Cancel</button>
						<button>Submit</button>
					</Form>
				</>
			)}
		</>
	);
};

const AddButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border-color: #178080;
	border-radius: 10px;
	border-style: solid;
	width: 140px;
	background-color: #178080;
	color: white;
	padding-left: 15px;
	padding-right: 15px;
	font-family: var(--font-ubuntu);
	font-weight: 700;
	font-size: 1rem;
	transition: background-color 0.3s, color 0.3s;
	&:hover {
		background-color: white;
		color: #178080;
		cursor: pointer;
	}
	svg {
		font-size: 1.4rem;
		padding-right: 10px;
	}
`;

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
	z-index: 3;
`;

const Overlay = styled.div`
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: #0000003b;
	z-index: 2;
`;

export default AddItem;
