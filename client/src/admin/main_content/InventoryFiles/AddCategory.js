//* ON PAUSE / COMEBACK ON THIS */

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const AddCategory = () => {
	const [newCat, setNewCat] = useState({});

	const { control, register, handleSubmit } = useForm({
		defaultValues: { fields: [{ key: '' }] },
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'fields',
	});

	const handleCategoryName = (value) => {
		setNewCat((prevCat) => ({ ...prevCat, name: value }));
	};

	const onSubmit = (data) => {
		//hardcoded for the user
		const model = {
			key: 'model',
			type: 'string',
		};
		const availability = {
			key: 'availability',
			type: 'boolean',
		};
		//

		const newFields = [...data.fields, model, availability];

		setNewCat((prevCat) => ({ ...prevCat, attributes: newFields }));
	};

	return (
		<>
			{' '}
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<button type='submit'>Submit</button>
			</form>
		</>
	);
};

export default AddCategory;
