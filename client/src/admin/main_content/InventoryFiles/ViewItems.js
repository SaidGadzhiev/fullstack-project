import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../../CategoryContext';
import AddItem from './AddItem';
import ViewSingleItem from './ViewSingleItem';
import EditSingleItem from './EditSingleItem';
import SearchBar from './SearchBar';
import DownloadData from './DownloadData';

const ViewItems = () => {
	const [items, setItems] = useState([]);
	const [itemId, setItemId] = useState(String);
	const [category, setCategory] = useState([]);

	const { currentCategory } = useCurrentCategory();

	const getItems = async () => {
		try {
			const result = await fetch(`/items/key/category/${currentCategory}`);
			const parsedResult = await result.json();
			setItems(parsedResult.data);
		} catch (err) {
			console.error('error getting items:', err);
		}
	};

	const getCategory = async () => {
		const result = await fetch(`/categories/key/name/${currentCategory}`);
		const parsedResult = await result.json();
		setCategory(parsedResult.data);
	};

	useEffect(() => {
		getItems();
		getCategory();
	}, [currentCategory]);

	//setting keys for the teable head
	const keys =
		items.length > 0
			? Object.keys(items[0]).filter((key) => key !== '_id')
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

	console.log(items.length);

	return (
		<>
			{items.length < 1 ? (
				<>
					<h1>{category.name}</h1>

					<div>You don't have any items in this category</div>
					<div>Add one now</div>
					<AddItem
						items={items}
						setItems={setItems}
						getItems={getItems}
						category={category}
					/>
				</>
			) : (
				<>
					<h1>{category.name}</h1>

					<div>
						<SearchBar />
						<DownloadData items={items} />
						<AddItem
							items={items}
							setItems={setItems}
							getItems={getItems}
							category={category}
						/>
					</div>

					<form>
						<table>
							<thead>
								{category.attributes && (
									<tr>
										{category.attributes.map((key) => {
											return <th key={key.key}>{key.key}</th>;
										})}
									</tr>
								)}
							</thead>
							<tbody>
								{items.map((item, index) => {
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
													getItems={getItems}
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
