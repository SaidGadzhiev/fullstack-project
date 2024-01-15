import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';
import AddCategory from '../main_content/InventoryFiles/AddCategory';
import styled from 'styled-components';
import { MdSpaceDashboard } from 'react-icons/md';

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
				<MdSpaceDashboard />
				<h3>Categories</h3>
			</Title>

			<div>
				{categories &&
					categories.length > 0 &&
					categories.map((cat, key) => {
						return (
							<button key={key} onClick={() => handleCategoryChange(cat.name)}>
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
	div {
		display: flex;
		flex-direction: column;
		button {
			text-align: left;
			border: none;
			margin-left: 2.75rem;
			margin-bottom: 20px;
			font-family: var(--font-ubuntu), sans-serif;
			font-size: 1.125rem;
			background-color: transparent;
			&:hover {
				cursor: pointer;
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
		width: 38px;
		height: auto;
	}
`;

export default CategorySelection;
