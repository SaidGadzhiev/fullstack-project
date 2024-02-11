import { MdDelete } from 'react-icons/md';
import fetchRequest from '../main_content/InventoryFiles/utils/fetchRequest';
import { deleteCategory, deleteItems } from './categoryHandler';
import { useState } from 'react';
import styled from 'styled-components';
import Loader from '../../Loader';

const DeleteCategory = ({ cat }) => {
	const [warning, setWarning] = useState(false);
	const [loading, setLoading] = useState(false);

	//handles the deletion of category and items assigned to it
	const handleDeleteEverything = async () => {
		try {
			setLoading(true);
			const deletedCat = await fetchRequest(() => deleteCategory(cat._id));
			const deletedItems = await fetchRequest(() => deleteItems(cat.name));

			if (!deletedCat || !deletedItems) {
				console.log('error deleting category');
			} else {
				setWarning(!warning);
				window.location.reload();
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleWarning = () => {
		setWarning(!warning);
	};

	return (
		<>
			{loading ? (
				<LoadingContainer className='loader-container'>
					<Loader className='loader' />
				</LoadingContainer>
			) : (
				<>
					<DeleteIcon onClick={handleWarning} className='delete-button'>
						<MdDelete />
					</DeleteIcon>
					{warning && (
						<>
							<Overlay className={warning ? 'appear' : 'no-appear'} />

							<DeleteWindow className={warning ? 'appear' : 'no-appear'}>
								<p>
									The items assigned to this category will be also deleted,
									would you like to delete?
								</p>
								<div>
									<button onClick={handleWarning}>Cancel</button>
									<button onClick={handleDeleteEverything}>delete</button>
								</div>
							</DeleteWindow>
						</>
					)}
				</>
			)}
		</>
	);
};

const LoadingContainer = styled.div`
	display: none !important;
	position: absolute;
	cursor: default;
	background-color: #0000003b;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;

	div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 150px;
		height: 150px;
	}
`;

const DeleteIcon = styled.button`
	padding: 0 !important;
	margin: 0 !important;
	margin-left: 20px !important;
	display: none !important;
`;

const DeleteWindow = styled.div`
	text-transform: none;
	cursor: default;
	position: absolute;
	top: 50%;
	left: 55%;
	transform: translate(-50%, -55%);
	width: 400px;
	background-color: white;
	padding: 20px 40px 30px 40px;
	height: auto;
	z-index: 3;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	div {
		display: flex;
		flex-direction: row !important;
		justify-content: space-evenly;
		margin-top: 20px;
		button {
			margin: 0;
			padding: 0;
			background-color: transparent !important;
			&:hover {
				color: #178080;
				margin-bottom: 3px;
			}
		}
	}
`;

const Overlay = styled.div`
	cursor: default;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: #0000003b;
	z-index: 2;
`;

export default DeleteCategory;
