import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';
import sortingByCategory from './sortingHandlers/sortingByCategory';
import itemByCategory from './sortingHandlers/itemByCategory';
import AddItem from './AddItem';

const ViewItems = () => {
	const [items, setItems] = useState([]);
	const [categories, setCategories] = useState([]);

	const { currentCategory } = useCurrentCategory();

	const getItems = async () => {
		const result = await fetch('/items');
		const parsedResult = await result.json();
		setItems(parsedResult.data);
	};

	const getCategories = async () => {
		const result = await fetch('/categories');
		const parsedResult = await result.json();
		setCategories(parsedResult.data);
	};

	useEffect(() => {
		getItems();
		getCategories();
	}, []);

	//sorting out which category is the user on
	const categoryArray = sortingByCategory(categories, currentCategory);

	//getting the items for a specific category
	const sortedByCategory = itemByCategory(items, currentCategory);

	//setting keys for the teable head
	const keys =
		sortedByCategory.length > 0
			? Object.keys(sortedByCategory[0]).filter((key) => key !== '_id')
			: [];

	return (
		<>
			{!categories ? (
				<div>hold on</div>
			) : (
				<>
					{/* <h1>{categoryArray[0].categoryName}</h1> */}
					<table>
						{categoryArray.map((column, index) => {
							return (
								<thead>
									<tr key={index}>
										{keys.map((key) => {
											return <th key={key}>{column[key]}</th>;
										})}
									</tr>
								</thead>
							);
						})}
						<tbody>
							{sortedByCategory.map((item, index) => {
								return (
									<tr key={index}>
										{keys.map((key) => {
											if (item[key] === false) {
												return <td key={key}>NO</td>;
											} else if (item[key] === true) {
												return <td key={key}>YES</td>;
											} else {
												return <td key={key}>{item[key]}</td>;
											}
										})}
									</tr>
								);
							})}
						</tbody>
					</table>

					<AddItem keys={keys} items={items} setItems={setItems} />
				</>
			)}
		</>
	);
};

export default ViewItems;
