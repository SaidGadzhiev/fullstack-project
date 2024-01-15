import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';
import styled from 'styled-components';
import { PiNotePencil } from 'react-icons/pi';

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
		<Selection>
			<Title>
				<PiNotePencil />

				<h3>Borrowing Requests:</h3>
			</Title>
			{requests && requests.length > 0 ? (
				<div>
					<button onClick={() => handleCategoryChange('new')}>
						New Requests
					</button>
					<button onClick={() => handleCategoryChange('old')}>
						Previous Requests
					</button>
				</div>
			) : null}
		</Selection>
	);
};

const Selection = styled.div`
	display: flex;
	flex-direction: column;
	font-family: var(--font-ubuntu), sans-serif;
	font-size: 1rem;
	div {
		display: flex;
		flex-direction: column;
		button {
			text-align: left;
			border: none;
			margin-left: 2.75rem;
			margin-bottom: 20px;
			font-family: var(--font-ubuntu), sans-serif;
			font-size: 1.125rem;
			background-color: transparent;
			&:hover {
				cursor: pointer;
			}
		}
	}
`;

const Title = styled.div`
	display: flex;
	flex-direction: row !important;
	align-items: center;

	h3 {
		margin-left: 10px;
	}
	svg {
		width: 38px;
		height: auto;
	}
`;

export default RequestSelection;
