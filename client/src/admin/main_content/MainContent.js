import ViewItems from './InventoryFiles/ViewItems';
import { useCurrentCategory } from '../CategoryContext';
import RequestSelection from '../sidebar_navigation/RequestSelection';
import Requests from './RequestsFiles/Requests';

const MainContent = () => {
	const { pathSelected, setPathSelected } = useCurrentCategory();

	return (
		<div>
			{pathSelected === 'items' ? (
				<ViewItems />
			) : pathSelected === 'requests' ? (
				<Requests />
			) : (
				<div>Choose something to see something</div>
			)}
		</div>
	);
};

export default MainContent;
