import fetchRequest from './utils/fetchRequest';
import { deleteItem } from './handleItem.js/deleteItem';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

const DeleteItem = ({ item, getItems }) => {
	//deletes the item thats clicked
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
			<DeleteButton onClick={(e) => handleDelete(e)}>
				<MdDelete />
			</DeleteButton>
		</>
	);
};

const DeleteButton = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 1.5rem;
	opacity: 0.6;
	transition: 0.3s;
	&:hover {
		opacity: 1;
	}
`;

export default DeleteItem;
