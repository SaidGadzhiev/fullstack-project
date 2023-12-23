const ViewSingleItem = ({ keys, item }) => {
	return (
		<>
			{keys.map((key) => {
				if (item[key] === false) {
					return <td key={key}>NO</td>;
				} else if (item[key] === true) {
					return <td key={key}>YES</td>;
				} else {
					return <td key={key}>{item[key]}</td>;
				}
			})}
		</>
	);
};

export default ViewSingleItem;
