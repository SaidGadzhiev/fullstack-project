import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';

const RequestSelection = () => {
	const { currentCategory, setCurrentCategory } = useCurrentCategory();
	const { pathSelected, setPathSelected } = useCurrentCategory();

	const [requests, setRequests] = useState([]);

	const getRequests = async () => {
		const result = await fetch('/requests');
		const parsedResult = await result.json();
		setRequests(parsedResult.data);
	};

	useEffect(() => {
		getRequests();
	}, []);

	const handleCategoryChange = (value) => {
		setCurrentCategory(value);
		setPathSelected('requests');
	};
	return (
		<>
			<h1>Borrowing Requests:</h1>
			{requests && requests.length > 0 ? (
				<>
					<button onClick={() => handleCategoryChange('new')}>
						New Requests
					</button>
					<button onClick={() => handleCategoryChange('old')}>
						Previous Requests
					</button>
				</>
			) : null}
		</>
	);
};

export default RequestSelection;
