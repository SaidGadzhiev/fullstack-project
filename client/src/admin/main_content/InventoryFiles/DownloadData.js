import Papa from 'papaparse';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';

const DownloadData = ({ items }) => {
	const handleDowndloadData = () => {
		//creating csv file with items
		const csv = Papa.unparse(items);

		//blob is raw data
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

		//create a download link
		const link = document.createElement('a');

		if (navigator.msSaveBlob) {
			//checks if its explorer/edge
			navigator.msSaveBlob(blob, `${items[0].category}.csv`);
		} else {
			//create a downdload link
			const url = URL.createObjectURL(blob);
			link.href = url;
			link.download = `${items[0].category}.csv`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<Export onClick={handleDowndloadData}>
			Export <FaAngleDown />
		</Export>
	);
};

const Export = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border-color: #178080;
	border-radius: 10px;
	border-style: solid;
	width: 140px;
	background-color: white;
	color: #178080;
	padding-left: 15px;
	padding-right: 15px;
	font-family: var(--font-ubuntu);
	font-weight: 700;
	font-size: 1rem;
	transition: background-color 0.3s, color 0.3s;

	&:hover {
		background-color: #178080;
		color: white;
		cursor: pointer;
	}
`;

export default DownloadData;
