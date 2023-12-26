import fetchRequest from './utils/fetchRequest';
import { deleteItem } from './handleItem.js/deleteItem';

const DeleteItem = ({ item, setSortedItems, sortedItems }) => {
	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetchRequest(() => deleteItem(item._id));
			const updatedArray = sortedItems.filter(
				(eachItem) => eachItem._id !== item._id
			);
			setSortedItems(updatedArray);
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
