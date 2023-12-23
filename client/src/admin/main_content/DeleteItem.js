import fetchRequest from './utils/fetchRequest';
import { deleteItem } from './handleItem.js/deleteItem';

const DeleteItem = ({ item }) => {
	const handleDelete = async () => {
		console.log(item);
		const res = await fetchRequest(() => deleteItem(item._id));
	};
	return (
		<>
			<button onClick={handleDelete}>D</button>
		</>
	);
};

export default DeleteItem;
