import { useEffect, useState } from 'react';
import { useCurrentCategory } from '../CategoryContext';
import styled from 'styled-components';
import { FiGitPullRequest } from 'react-icons/fi';
import fetchRequest from '../main_content/InventoryFiles/utils/fetchRequest';
import { updateNotification } from './requestHandler';

//same logic as CategorySelection
const RequestSelection = () => {
	const { currentCategory, setCurrentCategory } = useCurrentCategory();
	const { pathSelected, setPathSelected } = useCurrentCategory();
	const [notification, setNotification] = useState(false);
	const [audio] = useState(new Audio('../../assets/notification.mp3'));

	const [requests, setRequests] = useState([]);

	const getRequests = async () => {
		const result = await fetch('/requests');
		const parsedResult = await result.json();
		setRequests(parsedResult.data);
	};

	const getNotification = async () => {
		const result = await fetch('/notification');
		const parsedResult = await result.json();
		if (parsedResult.data) {
			setNotification(parsedResult.data.newNotification);
		}
	};

	useEffect(() => {
		if (notification) {
			audio.play();
			getRequests();
		}
	}, [notification]);

	const refreshNotification = async () => {
		try {
			const res = await fetchRequest(() => updateNotification());
			if (!res) {
				console.log('error updating item');
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getRequests();
		getNotification();

		const intervalId = setInterval(getNotification, 2000);
		return () => clearInterval(intervalId);
	}, []);

	const handleCategoryChange = (value) => {
		setCurrentCategory(value);
		setPathSelected('requests');
		if (value === 'new') {
			setNotification(false);
			refreshNotification();
		}
	};

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
						className={
							(currentCategory === 'new' ? 'selected ' : '') +
							(notification ? 'notification' : '')
						}
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

		.notification {
			position: relative;
		}
		.notification::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 10px;
			height: 10px;
			background-color: red;
			border-radius: 50%;
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
