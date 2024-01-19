import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';
import AddCategory from '../main_content/InventoryFiles/AddCategory';
import styled from 'styled-components';
import { MdOutlineInventory2 } from 'react-icons/md';

const CategorySelection = () => {
	const { currentCategory, setCurrentCategory } = useCurrentCategory();
	const [categories, setCategories] = useState([]);

	const { pathSelected, setPathSelected } = useCurrentCategory();

	const getCategories = async () => {
		const result = await fetch('/categories');
		const parsedResult = await result.json();
		setCategories(parsedResult.data);
	};

	useEffect(() => {
		getCategories();
	}, []);

	const handleCategoryChange = (selectedCat) => {
		setCurrentCategory(selectedCat);
		setPathSelected('items');
	};

	return (
		<Selection>
			<Title>
				<MdOutlineInventory2 />

				<h3>Categories</h3>
			</Title>

			<div>
				{categories &&
					categories.length > 0 &&
					categories.map((cat, key) => {
						return (
							<button
								key={key}
								onClick={() => handleCategoryChange(cat.name)}
								className={currentCategory === cat.name ? 'selected' : ''}
							>
								{cat.name}
							</button>
						);
					})}
				<AddCategory getCategories={getCategories} />
			</div>
		</Selection>
	);
};

const Selection = styled.div`
	display: flex;
	flex-direction: column;
	font-family: var(--font-ubuntu), sans-serif;
	font-size: 1rem;
	margin-bottom: 50px;
	div {
		display: flex;
		flex-direction: column;
		button {
			color: #676767;
			text-align: left;
			border: none;
			margin-bottom: 20px;
			font-family: var(--font-ubuntu), sans-serif;
			font-size: 1rem;
			background-color: transparent;
			padding: 10px;
			padding-left: 50px;
			letter-spacing: 1px;
			text-transform: capitalize;
			width: fit-content;
			display: inline-block;
			border-radius: 10px;
			font-weight: 900;
			transition: 0.2s;

			&:hover {
				cursor: pointer;
				background-color: #0000000a;
				font-weight: 900;
				color: #000000b5;
			}
		}
		.selected {
			color: #178080;
			background-color: #efe8e17a;
			padding-left: 55px;
			&:hover {
				background-color: #efe8e17a;
				color: #178080;
			}
		}
	}
`;

const Title = styled.div`
	display: flex;
	flex-direction: row !important;
	align-items: center;

	h3 {
		margin-left: 10px;
	}
	svg {
		width: 25px;
		height: auto;
	}
`;

export default CategorySelection;
