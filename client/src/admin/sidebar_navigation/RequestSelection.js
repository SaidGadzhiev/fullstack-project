import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';
import styled from 'styled-components';
import { FiGitPullRequest } from 'react-icons/fi';

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

	console.log(currentCategory);
	return (
		<Selection>
			<Title>
				<FiGitPullRequest />

				<h3>Borrowing Requests</h3>
			</Title>
			{requests && requests.length > 0 ? (
				<div>
					<button
						onClick={() => handleCategoryChange('new')}
						className={currentCategory === 'new' ? 'selected' : ''}
					>
						New Requests
					</button>
					<button
						onClick={() => handleCategoryChange('old')}
						className={currentCategory === 'old' ? 'selected' : ''}
					>
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
	margin-bottom: 50px;

	div {
		display: flex;
		flex-direction: column;
		button {
			color: #676767;
			text-align: left;
			border: none;
			margin-bottom: 20px;
			font-family: var(--font-ubuntu), sans-serif;
			font-size: 1rem;
			background-color: transparent;
			padding: 10px;
			padding-left: 50px;
			letter-spacing: 1px;
			text-transform: capitalize;
			width: fit-content;
			display: inline-block;
			border-radius: 10px;
			font-weight: 900;
			transition: 0.2s;

			&:hover {
				cursor: pointer;
				background-color: #0000000a;
				font-weight: 900;
				color: #000000b5;
			}
		}
		.selected {
			color: #178080;
			background-color: #efe8e17a;
			padding-left: 55px;
			&:hover {
				background-color: #efe8e17a;
				color: #178080;
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
		width: 25px;
		height: auto;
	}
`;

export default RequestSelection;
