import NewRequests from './NewRequests';
import OldRequests from './OldRequests';
import { useCurrentCategory } from '../../CategoryContext';

const Requests = () => {
	const { currentCategory, setCurrentCategory } = useCurrentCategory();

	return (
		<>
			{currentCategory === 'new' ? (
				<NewRequests />
			) : currentCategory === 'old' ? (
				<OldRequests />
			) : (
				<div>Something wrong here</div>
			)}
		</>
	);
};

export default Requests;
