//* ON PAUSE / COMEBACK ON THIS */

import { useState, useEffect, Fragment } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import fetchRequest from './utils/fetchRequest';
import { createCategory } from './handleCategories/createCategory';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';

const AddCategory = ({ getCategories }) => {
	const [newCat, setNewCat] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleView = () => {
		setIsOpen(!isOpen);
	};

	const { control, register, handleSubmit, reset } = useForm({
		defaultValues: { fields: [{ key: '' }] },
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'fields',
	});

	const handleCategoryName = (value) => {
		setNewCat((prevCat) => ({ ...prevCat, name: value }));
	};

	const onSubmit = async (data) => {
		setIsOpen(false);

		//hardcoded for the user
		const serialNumber = {
			key: 'Serial Number',
			type: 'string',
		};
		const model = {
			key: 'Model',
			type: 'string',
		};
		const availability = {
			key: 'Available',
			type: 'boolean',
		};
		//

		const newFields = [model, serialNumber, ...data.fields, availability];
		console.log(newFields);

		setNewCat((prevCat) => ({ ...prevCat, attributes: newFields }));

		setSubmitted(true);
	};

	useEffect(() => {
		const postData = async () => {
			try {
				const res = await fetchRequest(() => createCategory(newCat));
				if (!res) {
					console.log('error adding a category');
				}
				getCategories();
			} catch (err) {
				console.log(err);
			}
		};

		if (submitted) {
			postData();
			setNewCat({});
			reset();

			setSubmitted(false);
		}
	}, [submitted]);

	return (
		<>
			{!isOpen ? (
				<button type='button' onClick={handleToggleView}>
					Add +
				</button>
			) : (
				<>
					<button type='button' onClick={handleToggleView}>
						Add +
					</button>
					<Overlay />
					<Form onSubmit={handleSubmit(onSubmit)}>
						<p>
							Model, Serial Number and Availability are automatically added for
							you
						</p>
						<h4>Name of your category</h4>
						<input
							required
							onChange={(e) => handleCategoryName(e.target.value)}
						/>

						{fields.map((field, index) => {
							return (
								<Fragment key={field.id}>
									<h4>New key value pair</h4>

									<div>
										<input
											{...register(`fields[${index}].key`)}
											defaultValue={field.key}
											placeholder='Name of the row'
											required
										/>
										<select
											{...register(`fields[${index}].type`)}
											defaultValue={field.type}
											placeholder='Type of input'
											required
										>
											<option></option>
											<option>boolean</option>
											<option>string</option>
										</select>
										{fields.length > 1 && (
											<button type='button' onClick={() => remove(index)}>
												<IoCloseSharp />
											</button>
										)}
									</div>
								</Fragment>
							);
						})}
						<button type='button' onClick={() => append({ type: '' })}>
							Add
						</button>
						<button onClick={handleToggleView}>Cancel</button>

						<button type='submit'>Submit</button>
					</Form>
				</>
			)}
		</>
	);
};

const Form = styled.form`
	max-width: 350px;
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

	font-family: var(--font-poppins);
	font-size: 1rem;

	p {
		font-size: 0.875rem;
		opacity: 0.8;
		color: #035555;
	}

	h4 {
		margin-bottom: 10px;
	}
	input,
	select {
		width: 250px;
		height: 30px;
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

	div {
		max-width: 350px;
		display: flex;
		flex-direction: row !important;
		margin-bottom: 20px;
		justify-content: space-between;
		input {
			width: 60%;
			margin-right: 10px;
		}
		select {
			width: 30%;
			height: 34px;
			margin-right: 10px;
		}
		button {
			width: 10%;
			height: 34px;
			padding: 0;
			padding-top: 3px;
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

export default AddCategory;
