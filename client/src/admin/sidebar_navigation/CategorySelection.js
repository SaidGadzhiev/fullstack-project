import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';

const CategorySelection = () => {
	const { currentCategory, setCurrentCategory } = useCurrentCategory();
	const [categories, setCategories] = useState([]);

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
	};

	const handleNewCategory = () => {};

	return (
		<>
			<h1>Categories</h1>
			<div>
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
			</div>
		</>
	);
};

export default CategorySelection;
