import ViewItems from './InventoryFiles/ViewItems';
import { useCurrentCategory } from '../CategoryContext';
import RequestSelection from '../sidebar_navigation/RequestSelection';
import Requests from './RequestsFiles/Requests';

const MainContent = () => {
	const { pathSelected, setPathSelected } = useCurrentCategory();

	return (
		<>
			{pathSelected === 'items' ? (
				<ViewItems />
			) : pathSelected === 'requests' ? (
				<Requests />
			) : (
				<div>Choose something to see something</div>
			)}
		</>
	);
};

export default MainContent;
