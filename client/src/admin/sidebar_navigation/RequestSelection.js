import { useCurrentCategory } from '../CategoryContext';

const RequestSelection = () => {
	const { PathSelected, setPathSelected } = useCurrentCategory();
	const handlePathChange = () => {
		setPathSelected('requests');
	};
	return (
		<>
			<h1>Borrowing Requests:</h1>
			<button onClick={handlePathChange}>New Requests</button>
			<button onClick={handlePathChange}>Previous Requests</button>
		</>
	);
};

export default RequestSelection;
