import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../../CategoryContext';
import sortingByCategory from './sortingHandlers/sortingByCategory';
import itemByCategory from './sortingHandlers/itemByCategory';
import AddItem from './AddItem';
import ViewSingleItem from './ViewSingleItem';
import EditSingleItem from './EditSingleItem';
import SearchBar from './SearchBar';

const ViewItems = () => {
	const [items, setItems] = useState([]);
	const [categories, setCategories] = useState([]);
	const [sortedItems, setSortedItems] = useState([]);
	const [itemId, setItemId] = useState(String);

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

	//to go from view to edit for each Item
	const handleIdChange = (e, item) => {
		e.preventDefault();
		setItemId(item._id);
	};

	//to get out of edit mode
	const handleCancelChange = (e, item) => {
		setItemId(null);
	};

	return (
		<>
			{!categories ? (
				<div>hold on</div>
			) : (
				<>
					<div>
						<SearchBar />
						<AddItem
							sortedItems={sortedItems}
							setSortedItems={setSortedItems}
							getItems={getItems}
						/>
					</div>

					<form>
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
										<>
											{itemId === item._id ? (
												<EditSingleItem
													keys={keys}
													item={item}
													index={index}
													handleCancelChange={handleCancelChange}
													getItems={getItems}
												/>
											) : (
												<ViewSingleItem
													keys={keys}
													item={item}
													index={index}
													setSortedItems={setSortedItems}
													sortedItems={sortedItems}
													handleIdChange={handleIdChange}
												/>
											)}
										</>
									);
								})}
							</tbody>
						</table>
					</form>
				</>
			)}
		</>
	);
};

export default ViewItems;
