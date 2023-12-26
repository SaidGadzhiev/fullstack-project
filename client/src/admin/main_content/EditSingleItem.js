import { useState } from 'react';
import fetchRequest from './utils/fetchRequest';
import { updateItem } from './handleItem.js/updateItem';

const EditSingleItem = ({
	keys,
	item,
	index,
	handleCancelChange,
	getItems,
}) => {
	const [itemData, editFormData] = useState(item);
	const changedValues = {};

	const handleOptionChange = (key, e) => {
		editFormData((prevData) => ({
			...prevData,
			[key]: e.target.value === 'yes',
		}));
	};

	const handleInputChange = (key, e) => {
		editFormData((prevData) => ({ ...prevData, [key]: e.target.value }));
	};
	const handleSaveChange = async (e) => {
		e.preventDefault();

		//checks which value are different from the previous item data
		for (const key in itemData) {
			if (itemData.hasOwnProperty(key) && item[key] !== itemData[key]) {
				changedValues[key] = itemData[key];
			}
		}

		try {
			const res = await fetchRequest(() =>
				updateItem(itemData._id, changedValues)
			);
		} catch (err) {
			console.log(err);
		}
		getItems();

		handleCancelChange();
	};

	return (
		<>
			<tr key={index}>
				{keys.map((key) => {
					if (itemData[key] === false || itemData[key] === true) {
						return (
							<td key={key}>
								<select
									onChange={(e) => handleOptionChange(key, e)}
									type='select'
									required
									placeholder='select'
								>
									<option value='yes'>YES</option>
									<option value='no'>NO</option>
								</select>
							</td>
						);
					} else {
						return (
							<td key={key}>
								<input
									onChange={(e) => handleInputChange(key, e)}
									required
									value={itemData[key]}
								></input>
							</td>
						);
					}
				})}
				<td>
					<button type='button' onClick={(e) => handleSaveChange(e)}>
						Save
					</button>
					<button
						type='button'
						onClick={(e) => handleCancelChange(e, item._id)}
					>
						Cancel
					</button>
				</td>
			</tr>
		</>
	);
};
export default EditSingleItem;
