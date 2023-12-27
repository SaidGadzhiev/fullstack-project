import DeleteItem from './DeleteItem';

const ViewSingleItem = ({
	keys,
	item,
	index,
	setSortedItems,
	sortedItems,
	handleIdChange,
}) => {
	return (
		<>
			<tr key={index}>
				{keys.map((key) => {
					if (key !== 'category') {
						if (item[key] === false) {
							return <td key={key}>NO</td>;
						} else if (item[key] === true) {
							return <td key={key}>YES</td>;
						} else {
							return <td key={key}>{item[key]}</td>;
						}
					}
					return null;
				})}
				<td>
					<button type='button' onClick={(e) => handleIdChange(e, item)}>
						Edit
					</button>
				</td>
				<td>
					<DeleteItem
						item={item}
						setSortedItems={setSortedItems}
						sortedItems={sortedItems}
					/>
				</td>
			</tr>
		</>
	);
};

export default ViewSingleItem;
