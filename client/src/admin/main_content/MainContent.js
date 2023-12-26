import ViewItems from './InventoryFiles/ViewItems';
import { useCurrentCategory } from '../CategoryContext';
import RequestSelection from '../sidebar_navigation/RequestSelection';

const MainContent = () => {
	const { pathSelected, setPathSelected } = useCurrentCategory();
	console.log(pathSelected);
	return (
		<>
			{pathSelected === 'items' ? (
				<ViewItems />
			) : pathSelected === 'requests' ? (
				<RequestSelection />
			) : (
				<div>Choose something to see something</div>
			)}
		</>
	);
};

export default MainContent;
