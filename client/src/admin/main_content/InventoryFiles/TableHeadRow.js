import { useEffect, useState } from 'react';

const TableHeadRow = ({ category }) => {
	const [isEdible, setIsEdible] = useState(String);
	const [newKey, setNewKey] = useState('');

	const handleBlur = () => {
		setIsEdible(null);
		console.log('unclicked');
	};

	const handleDoubleClick = (e, value) => {
		setIsEdible(value);
		setNewKey(value);
		console.log('clicked');
	};

	const handleInput = (value) => {
		setNewKey(value);
	};

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
											onBlur={handleBlur()}
											type='text'
											id='key'
											value={newKey}
											onChange={(e) => handleInput(e.target.value)}
										/>
									) : (
										<span onDoubleClick={(e) => handleDoubleClick(e, key.key)}>
											{' '}
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
