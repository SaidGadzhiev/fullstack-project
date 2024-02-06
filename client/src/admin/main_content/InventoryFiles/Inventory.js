import { Fragment, useEffect, useState } from 'react';
import { useCurrentCategory } from '../../CategoryContext';
import AddItem from './AddItem';
import NoItemsPage from './NoItemsPage';
import SearchBar from './SearchBar';
import DownloadData from './DownloadData';
import TableHeadRow from './TableHeadRow';
import styled from 'styled-components';
import Loader from '../../../Loader';
import ViewItems from './ViewItems';

//the component that encapsulates - TableHeadRow, ViewSingleItem, EditSingleItem, SearchBar, AddItem, DeleteItem
const Inventory = () => {
	const [items, setItems] = useState([]);
	const [itemId, setItemId] = useState(String);
	const [category, setCategory] = useState([]);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { currentCategory } = useCurrentCategory();

	//getting the items specifically on the selected category
	const getItems = async () => {
		try {
			setIsLoading(true);
			const result = await fetch(`/items/key/category/${currentCategory}`);
			const parsedResult = await result.json();
			setItems(parsedResult.data);
		} catch (err) {
			console.error('error getting items:', err);
		} finally {
			setIsLoading(false);
		}
	};

	//getting the category selected (the object)
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

	return (
		<Content>
			{items.length < 1 ? (
				<>
					{/* represents an empty category -  no items inside */}
					<h1>{category.name}</h1>
					<NoItemsPage
						items={items}
						getItems={getItems}
						category={category}
						getCategory={getCategory}
					></NoItemsPage>
				</>
			) : (
				<>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<TitleAndFilters>
								<h1>{category.name}</h1>

								<div>
									<SearchBar search={search} setSearch={setSearch} />
									<DownloadData items={items} />
									<AddItem
										items={items}
										getItems={getItems}
										category={category}
										getCategory={getCategory}
									/>
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
										<ViewItems
											items={items}
											search={search}
											keys={keys}
											handleCancelChange={handleCancelChange}
											getItems={getItems}
											handleIdChange={handleIdChange}
											itemId={itemId}
										/>
									</tbody>
								</table>
							</Form>
						</>
					)}
				</>
			)}
		</Content>
	);
};

const Content = styled.div`
	padding-left: 50px;
	padding-right: 50px;
	@media (max-width: 850px) {
		padding: 0;
	}
	h1 {
		text-transform: capitalize;
		font-family: var(--font-ubuntu);
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
		@media (max-width: 1200px) {
			flex-wrap: wrap;

			button {
				height: 45px;
			}
		}
		@media (max-width: 550px) {
			input {
				margin-top: 25px;
			}
			button {
				margin-top: 35px;

				margin-bottom: 30px;
			}
		}
	}
	@media (max-width: 1200px) {
		flex-direction: column;
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
		@media (max-width: 1200px) {
			padding: 0;
			margin: 0;
			width: 89vw;
		}
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
	select {
		margin: 0 auto;
	}
`;

export default Inventory;
