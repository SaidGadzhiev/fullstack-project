//* ON PAUSE / COMEBACK ON THIS */

import { useState } from 'react';

const AddCategory = () => {
	//the object of the category
	//hardcoded keys = obligated
	const [catForm, setCatForm] = useState({
		model: 'Model',
		serialNumber: 'Serial Number',
	});

	//array of tyepof values in the category object
	//hardcoded keys and types = obligated
	const [catValues, setCatValues] = useState([
		{ key: 'model', type: 'string' },
		{ key: 'serialNumber', type: 'string' },
	]);

	const handleCategoryName = (value) => {
		const key = 'categoryName';
		setCatForm((prevForm) => ({ ...prevForm, [key]: value }));
		setCatValues([...catValues, { key: key, type: 'string' }]);
	};
	console.log(catValues);
	console.log(catForm);

	return (
		<>
			<div>Add a new category</div>
			<form>
				<label>Category Name</label>
				<input onChange={(e) => handleCategoryName(e.target.value)}></input>
			</form>
		</>
	);
};

export default AddCategory;
