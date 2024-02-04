import { FaBoxesPacking } from 'react-icons/fa6';
import styled from 'styled-components';
import AddItem from './AddItem';

//this page is only shown when a category has 0 items... check Inventory.js for clarification

const NoItemsPage = ({ items, getItems, category, getCategory }) => {
	return (
		<Content>
			<FaBoxesPacking className='noitems' />
			<p>You don't have any items in this category</p>
			<AddItem
				items={items}
				getItems={getItems}
				category={category}
				getCategory={getCategory}
			/>
		</Content>
	);
};

const Content = styled.div`
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

export default NoItemsPage;
