import fetchRequest from './utils/fetchRequest';
import { deleteItem } from './handleItem.js/deleteItem';

const DeleteItem = ({ item, getItems }) => {
	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetchRequest(() => deleteItem(item._id));

			if (!res) {
				console.log('error deleting item');
			}
			getItems();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<button onClick={(e) => handleDelete(e)}>D</button>
		</>
	);
};

export default DeleteItem;
