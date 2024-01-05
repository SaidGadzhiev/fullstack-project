import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';
import AddCategory from '../main_content/InventoryFiles/AddCategory';
import { NavLink } from 'react-router-dom';

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

	const handleNewCategory = () => {};

	return (
		<>
			<h1>Categories</h1>
			{/* <div>
				{categories &&
					categories.length > 0 &&
					categories.map((cat, key) => {
						return (
							<button
								key={key}
								onClick={() => handleCategoryChange(cat.categoryName)}
							>
								{cat.categoryName}
							</button>
						);
					})}
				<button onClick={() => handleNewCategory()}>+</button>
				<AddCategory />
				{/* <AddCategory /> 
			</div> */}
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
				<button onClick={() => handleNewCategory()}>+</button>
				<AddCategory />
				{/* <AddCategory /> */}
			</div>
		</>
	);
};

export default CategorySelection;
