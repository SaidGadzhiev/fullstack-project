import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';
import sortingByCategory from './sortingHandlers/sortingByCategory';
import itemByCategory from './sortingHandlers/itemByCategory';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';
import ViewSingleItem from './ViewSingleItem';

const ViewItems = () => {
	const [items, setItems] = useState([]);
	const [categories, setCategories] = useState([]);
	const [sortedItems, setSortedItems] = useState([]);

	const { currentCategory } = useCurrentCategory();

	const getItems = async () => {
		try {
			const result = await fetch('/items');
			const parsedResult = await result.json();
			setItems(parsedResult.data);
		} catch (err) {
			console.error('error getting items:', err);
		}
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

	useEffect(() => {
		const sort = itemByCategory(items, currentCategory);
		setSortedItems(sort);
	}, [items, currentCategory]);

	//setting keys for the teable head
	const keys =
		sortedItems.length > 0
			? Object.keys(sortedItems[0]).filter((key) => key !== '_id')
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
								<thead key={index}>
									<tr key={index}>
										{keys.map((key) => {
											return <th key={key}>{column[key]}</th>;
										})}
									</tr>
								</thead>
							);
						})}
						<tbody>
							{sortedItems.map((item, index) => {
								return (
									<tr key={index}>
										<ViewSingleItem keys={keys} item={item} />
										<td>
											<DeleteItem
												item={item}
												setSortedItems={setSortedItems}
												sortedItems={sortedItems}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<AddItem
						sortedItems={sortedItems}
						setSortedItems={setSortedItems}
						getItems={getItems}
					/>
				</>
			)}
		</>
	);
};

export default ViewItems;
