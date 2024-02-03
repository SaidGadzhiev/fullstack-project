import { useEffect, useState } from 'react';
import styled from 'styled-components';
import convertKeys from './handleCamelCase/convertKeys';
import Loader from '../../../Loader';

// getting old requests when selected
const OldRequests = () => {
	const [oldRequests, setOldRequests] = useState([]);
	const [keys, setKeys] = useState();

	const getRequests = async () => {
		try {
			const result = await fetch('/requests');
			const parsedResult = await result.json();
			const removeNew = parsedResult.data.filter((r) => r.category !== 'new');
			setOldRequests(removeNew.reverse());
		} catch (err) {
			console.log('error getting the requests :', err);
		}
	};

	useEffect(() => {
		getRequests();
	}, []);

	useEffect(() => {
		//check convertKeys in handleCamelCase folder
		setKeys(convertKeys(oldRequests[0]));
	}, [oldRequests]);

	return (
		<Content>
			<h1>Previous Requests</h1>
			{oldRequests.length < 1 ? (
				<Loader />
			) : (
				<Table>
					<thead>
						<tr>
							{keys.map((column) => {
								if (column !== '_id' && column !== 'Category') {
									return <th key={column}>{column}</th>;
								}
								return null;
							})}
						</tr>
					</thead>

					<tbody>
						{oldRequests.map((r) => {
							return (
								<tr key={r._id}>
									{Object.entries(r).map((key) => {
										if (key[0] !== '_id' && key[0] !== 'category')
											return <td key={key}>{key[1]}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
		</Content>
	);
};

const Content = styled.div`
	padding-left: 50px;
	padding-right: 50px;
	h1 {
		text-transform: capitalize;
		font-family: var(--font-ubuntu);
	}
	position: relative;
	.spinner {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100px;
		height: 100px;
		border: 4px solid #178080;
	}
`;

const Table = styled.table`
	border-collapse: collapse;
	margin: auto;
	width: 77vw;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	border-spacing: 20px 40px;
	box-shadow: 0px -4px 10px 2px rgba(0, 0, 0, 0.07);

	thead {
		text-align: left;
		font-size: 1.125rem;
		background-color: #efe8e1;
		border-radius: 10px;
	}
	th,
	td {
		padding: 20px;
		text-align: left;
	}

	th {
		color: black;
	}

	th:first-child {
		border-radius: 8px 0 0 0; /* Border radius for the top-left corner */
	}

	th:last-child {
		border-radius: 0 8px 0 0; /* Border radius for the top-right corner */
	}

	tr:nth-child(even) {
		background-color: #f2f2f2; /* Background color for every second row */
	}
`;

export default OldRequests;
