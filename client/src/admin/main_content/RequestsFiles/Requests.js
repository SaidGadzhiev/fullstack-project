import NewRequests from './NewRequests';
import OldRequests from './OldRequests';
import { useCurrentCategory } from '../../CategoryContext';

//renders either new or old requests depending on what is selected in the navbar
const Requests = () => {
	const { currentCategory } = useCurrentCategory();

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
