import { Fragment, useEffect, useState } from 'react';
import { useCurrentCategory } from '../../CategoryContext';
import AddItem from './AddItem';
import ViewSingleItem from './ViewSingleItem';
import EditSingleItem from './EditSingleItem';
import SearchBar from './SearchBar';
import DownloadData from './DownloadData';
import TableHeadRow from './TableHeadRow';
import styled from 'styled-components';
import { FaBoxesPacking } from 'react-icons/fa6';

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
				<>
					<h1>{category.name}</h1>
					<NoItemsPage>
						<FaBoxesPacking className='noitems' />
						<p>You don't have any items in this category</p>
						{renderAddItem({
							items: items,
							getItems: getItems,
							category: category,
						})}
					</NoItemsPage>
				</>
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
	position: relative;
	h1 {
		text-transform: capitalize;
		font-family: var(--font-ubuntu);
	}
`;

const NoItemsPage = styled.div`
	margin: 0 auto;
	margin-top: 30vh;
	text-align: center;
	.noitems {
		width: 100px;
		height: auto;
		color: gray;
	}
	button {
		margin: 0 auto;
		height: 50px;
	}
`;

const TitleAndFilters = styled.div`
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
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
