import { Fragment, useEffect, useState } from 'react';
import { useCurrentCategory } from '../../CategoryContext';
import AddItem from './AddItem';
import ViewSingleItem from './ViewSingleItem';
import EditSingleItem from './EditSingleItem';
import SearchBar from './SearchBar';
import DownloadData from './DownloadData';
import TableHeadRow from './TableHeadRow';
import styled from 'styled-components';

const ViewItems = () => {
	const [items, setItems] = useState([]);
	const [itemId, setItemId] = useState(String);
	const [category, setCategory] = useState([]);
	const [search, setSearch] = useState('');

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

	const renderAddItem = ({ items, getItems, category }) => {
		return <AddItem items={items} getItems={getItems} category={category} />;
	};

	return (
		<Content>
			{items.length < 1 ? (
				<div>
					<h1>{category.name}</h1>
					<div>You don't have any items in this category</div>
					<div>Add one now</div>
					{renderAddItem({
						items: items,
						getItems: getItems,
						category: category,
					})}
				</div>
			) : (
				<>
					<TitleAndFilters>
						<h1>{category.name}</h1>

						<div>
							<SearchBar search={search} setSearch={setSearch} />
							<DownloadData items={items} />
							{renderAddItem({
								items: items,
								getItems: getItems,
								category: category,
							})}
						</div>
					</TitleAndFilters>

					<Form>
						<table>
							<thead>
								<TableHeadRow
									category={category}
									getCategory={getCategory}
									getItems={getItems}
								/>
							</thead>
							<tbody>
								{items
									.filter((item) => {
										return search.toLowerCase() === ''
											? item
											: item.serialNumber
													.toLowerCase()
													.includes(search.toLowerCase());
									})
									.map((item, index) => {
										return (
											<Fragment key={item._id}>
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
											</Fragment>
										);
									})}
							</tbody>
						</table>
					</Form>
				</>
			)}
		</Content>
	);
};

const Content = styled.div`
	padding-left: 50px;
	padding-right: 50px;
`;

// const Spinner = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	height: 100vh;

// 	@keyframes spin {
// 		to {
// 			transform: rotate(360deg);
// 		}
// 	}

// 	::after {
// 		content: '';
// 		display: inline-block;
// 		width: 30px;
// 		height: 30px;
// 		border: 4px solid #ccc;
// 		border-top: 4px solid #333;
// 		border-radius: 50%;
// 		animation: spin 1s linear infinite;
// 	}
// `;

const TitleAndFilters = styled.div`
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	h1 {
		text-transform: capitalize;
		font-family: var(--font-ubuntu);
	}
	div {
		display: flex;
		*:not(:last-child) {
			margin-right: 20px;
		}
	}
`;

const Form = styled.form`
	table {
		border-collapse: collapse;
		margin: auto;
		width: 77vw;
		background-color: white;
		padding: 20px;
		border-radius: 10px;
		border-spacing: 20px 40px;
		box-shadow: 0px -4px 10px 2px rgba(0, 0, 0, 0.07);
	}

	thead {
		text-align: left;
		font-size: 1.125rem;
		background-color: #efe8e1;
		border-radius: 10px;
	}
	th,
	td {
		padding: 20px;
		text-align: left;
	}

	th {
		color: black;
	}

	th:first-child {
		border-radius: 8px 0 0 0; /* Border radius for the top-left corner */
	}

	th:last-child {
		border-radius: 0 8px 0 0; /* Border radius for the top-right corner */
	}

	tr:nth-child(even) {
		background-color: #f2f2f2; /* Background color for every second row */
	}
`;

export default ViewItems;
