import { useEffect, useState } from 'react';
import { createItem } from './handleItem.js/createItem';
import fetchRequest from './utils/fetchRequest';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';

const _ = require('lodash');

const AddItem = ({ items, getItems, category, getCategory }) => {
	const [formData, newFormData] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [errors, setErrors] = useState();

	const handleToggleView = () => {
		setErrors(null);
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
	useEffect(() => {
		const initialData = camelCaseObject.reduce((acc, curr) => {
			acc[curr.key] = curr.key === 'category' ? items[0].category : '';
			return acc;
		}, {});

		newFormData(initialData);
	}, [category]);

	//changing the values of the array for the item for boolean condition
	const handleOptionChange = (key, value) => {
		const newKey = _.camelCase(key);
		if (value.length > 0) {
			newFormData((prevData) => ({ ...prevData, [newKey]: value === 'yes' }));
		}
	};

	//changing the values of the array for the item
	const handleFormChange = (key, value) => {
		const newKey = _.camelCase(key);
		newFormData((prevData) => ({ ...prevData, [newKey]: value }));
		newFormData((prevData) => ({
			...prevData,
			category: category.name,
		}));
	};

	//post request to create the item
	const handleAddItemSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetchRequest(() => createItem(formData));
			if (!res.data) {
				setErrors(res.message);
			} else {
				setErrors(null);
				setIsOpen(false);
				getItems();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{!isOpen ? (
				<AddButton type='button' onClick={handleToggleView}>
					<FiPlus />
					Add Item
				</AddButton>
			) : (
				<>
					<AddButton type='button' onClick={handleToggleView}>
						<FiPlus />
						Add Item
					</AddButton>
					<Overlay></Overlay>
					{/* make the form its own component */}
					<Form onSubmit={handleAddItemSubmit}>
						<h3>Add new item </h3>
						{errors && <Error>{errors}</Error>}
						{category.attributes.map(({ key, type }) => {
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
												// value={formData[key] || ''}
												onChange={(e) => handleFormChange(key, e.target.value)}
												required={true}
											></input>
										</div>
									);
								}
							}
							return null;
						})}
						<div>
							<button onClick={handleToggleView}>Cancel</button>
							<button>Submit</button>
						</div>
					</Form>
				</>
			)}
		</>
	);
};

const Error = styled.p`
	color: red;
	font-size: 0.825rem;
`;
const AddButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border-color: #178080;
	border-radius: 10px;
	border-style: solid;
	width: 150px;
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
	padding: 30px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Box shadow for the form */
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);

	z-index: 3;

	h3 {
		margin-top: 0;
		margin-bottom: 30px;
	}

	div {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		margin-right: 0 !important;
	}

	input,
	select {
		width: 150px;
		height: 40px;
		padding-left: 10px;
		font-family: var(--font-poppins);
		font-size: 1rem;
		border-radius: 5px;
		border: 1px solid #17808042;
		opacity: 0.5;
		transition: 0.2s;
		&:focus {
			opacity: 1;

			outline: none;
			border: 1px solid #035555;
		}
	}

	select {
		width: 100px;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		border-color: #178080;
		border-radius: 10px;
		border-style: solid;
		width: 140px;
		height: 50px;
		background-color: white;
		color: #178080;
		padding-left: 15px;
		padding-right: 15px;
		font-family: var(--font-ubuntu);
		font-weight: 700;
		font-size: 1rem;
		transition: background-color 0.3s, color 0.3s;
		margin-top: 25px;

		&:hover {
			background-color: #178080;
			color: white;
			cursor: pointer;
		}
	}
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
