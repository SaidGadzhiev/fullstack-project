import { useEffect, useRef, useState } from 'react';
import fetchRequest from './utils/fetchRequest';
import { updateCategory } from './handleCategories/updateCategory';

//rendering the table head row
const TableHeadRow = ({ category, getCategory, getItems }) => {
	const [isEdible, setIsEdible] = useState(String);
	const [newKey, setNewKey] = useState('');
	const [oldKey, setOldKey] = useState('');
	const inputRef = useRef(null);

	useEffect(() => {
		if (isEdible && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEdible]);

	//*** - 🚧 UNDER CONSTRUCTION 🚧 - ***/
	const handleDoubleClick = (e, value) => {
		setIsEdible(value);
		setOldKey(value);
		setNewKey(value);
	};

	const handleBlur = async (event) => {
		//relatedTarget = whats focused by the cursor
		//.isEqualNode(input...) checks if the cursor is being clicked outside of input
		if (
			!event.relatedTarget ||
			!event.relatedTarget.isEqualNode(inputRef.current)
		) {
			setIsEdible(null);
			const changedKeys = {
				oldKey: oldKey,
				newKey: newKey,
			};
			try {
				const res = await fetchRequest(() =>
					updateCategory(category._id, changedKeys)
				);
				if (res) {
					getCategory();
				}
			} catch (err) {
				console.log(err);
			}
		}
	};
	//*** - 🚧 UNDER CONSTRUCTION 🚧 - ***/

	const handleInput = (value) => {
		setNewKey(value);
	};

	return (
		<>
			{category.attributes && (
				<tr>
					{category.attributes.map((key) => {
						if (
							key.key === 'Serial Number' ||
							key.key === 'Model' ||
							key.key === 'Available'
						) {
							return <th key={key.key}>{key.key}</th>;
						} else {
							return (
								<th key={key.key}>
									{isEdible === key.key ? (
										<input
											onBlur={handleBlur}
											type='text'
											id='key'
											value={newKey}
											onChange={(e) => handleInput(e.target.value)}
										/>
									) : (
										<span onDoubleClick={(e) => handleDoubleClick(e, key.key)}>
											{key.key}
										</span>
									)}
								</th>
							);
						}
					})}
					<th>Edit</th>
				</tr>
			)}
		</>
	);
};
export default TableHeadRow;
