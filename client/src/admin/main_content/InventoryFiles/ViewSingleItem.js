import DeleteItem from './DeleteItem';

const ViewSingleItem = ({ keys, item, index, handleIdChange, getItems }) => {
	return (
		<>
			<tr key={index}>
				{keys.map((key) => {
					if (key !== 'category') {
						if (item[key] === false) {
							return <td key={key}>NO</td>;
						} else if (item[key] === true) {
							return <td key={key}>YES</td>;
						} else if (key === 'serialNumber') {
							return <td key={key}>{item[key]}</td>;
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

					<DeleteItem item={item} getItems={getItems} />
				</td>
			</tr>
		</>
	);
};

export default ViewSingleItem;
