import ViewItems from './InventoryFiles/ViewItems';
import { useCurrentCategory } from '../CategoryContext';
import Requests from './RequestsFiles/Requests';
import styled from 'styled-components';

const MainContent = () => {
	const { pathSelected, setPathSelected } = useCurrentCategory();

	return (
		<Display>
			{pathSelected === 'items' ? (
				<ViewItems />
			) : pathSelected === 'requests' ? (
				<Requests />
			) : (
				<IDK>
					<p>¯_(ツ)_/¯</p>
					<p>NOTHING IS SELECTED</p>
				</IDK>
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

const IDK = styled.div`
	font-family: var(--font-ubuntu);
	display: flex;
	flex-direction: column;
	justify-content: baseline;
	width: 400px;
	margin: 0 auto;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateY(-50%);

	:first-child {
		font-size: 5rem;
		margin-bottom: 0px;
	}
	:last-child {
		font-size: 1.5rem;
	}
`;

export default MainContent;
