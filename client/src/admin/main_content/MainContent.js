import Inventory from './InventoryFiles/Inventory';
import { useCurrentCategory } from '../CategoryContext';
import Requests from './RequestsFiles/Requests';
import styled from 'styled-components';
import { FaBoxesPacking } from 'react-icons/fa6';

//main content shows either ViewItems selected on the category
//if no category selected, it will show an 'empty' page
const MainContent = () => {
	const { pathSelected } = useCurrentCategory();

	return (
		<Display>
			{pathSelected === 'items' ? (
				<Inventory />
			) : pathSelected === 'requests' ? (
				<Requests />
			) : (
				<NoItemsPage>
					<FaBoxesPacking className='noitems' />
					<p>Select a category to see your inventory</p>
				</NoItemsPage>
			)}
		</Display>
	);
};

const Display = styled.div`
	background-color: #f6f2ee;
	padding: 20px;
	height: 95.5vh;
	overflow: auto;
`;

const NoItemsPage = styled.div`
	margin: 0 auto;
	margin-top: 35vh;
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

export default MainContent;
