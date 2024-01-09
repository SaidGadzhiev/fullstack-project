//* ON PAUSE / COMEBACK ON THIS */

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import fetchRequest from './utils/fetchRequest';
import { createCategory } from './handleCategories/createCategory';
import styled from 'styled-components';

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

		const newFields = [...data.fields, model, serialNumber, availability];

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
					+
				</button>
			) : (
				<Form onSubmit={handleSubmit(onSubmit)}>
					<label>Name of your category:</label>
					<input
						required
						onChange={(e) => handleCategoryName(e.target.value)}
					></input>
					{fields.map((field, index) => {
						return (
							<>
								<div key={field.id}>
									{' '}
									New key value pair:
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
											Remove
										</button>
									)}
								</div>
							</>
						);
					})}
					<button type='button' onClick={() => append({ type: '' })}>
						Add
					</button>
					<button onClick={handleToggleView}>Cancel</button>

					<button type='submit'>Submit</button>
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

export default AddCategory;
