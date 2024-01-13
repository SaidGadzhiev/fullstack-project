import { useEffect, useRef, useState } from 'react';

const TableHeadRow = ({ category }) => {
	const [isEdible, setIsEdible] = useState(String);
	const [newKey, setNewKey] = useState('');
	const inputRef = useRef(null);

	console.log(category);

	useEffect(() => {
		if (isEdible && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEdible]);

	const handleDoubleClick = (e, value) => {
		setIsEdible(value);
		setNewKey(value);
	};

	const handleBlur = (event) => {
		//relatedTarget = whats focused by the cursor
		//.isEqualNode(input...) checks if teh cursor is being clicked outside of input
		if (
			!event.relatedTarget ||
			!event.relatedTarget.isEqualNode(inputRef.current)
		) {
			setIsEdible(null);
			console.log('being unclicked');
		}
	};

	const handleInput = (value) => {
		setNewKey(value);
	};

	console.log(newKey);

	return (
		<>
			{category.attributes && (
				<tr>
					{category.attributes.map((key) => {
						if (key.key === 'Serial Number' || key.key === 'Model') {
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
