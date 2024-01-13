import { useEffect, useRef, useState } from 'react';
import fetchRequest from './utils/fetchRequest';
import { updateCategory } from './handleCategories/updateCategory';
import { updateItemByCat } from './handleItem.js/updateItemByCat';

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

	const handleDoubleClick = (e, value) => {
		setIsEdible(value);
		setOldKey(value);
		setNewKey(value);
	};

	const handleBlur = async (event) => {
		//relatedTarget = whats focused by the cursor
		//.isEqualNode(input...) checks if teh cursor is being clicked outside of input
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
			try {
				const res = await fetchRequest(() =>
					updateItemByCat(category._id, changedKeys, category.name)
				);
				if (res) {
					// getItems();
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

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
				</tr>
			)}
		</>
	);
};
export default TableHeadRow;
