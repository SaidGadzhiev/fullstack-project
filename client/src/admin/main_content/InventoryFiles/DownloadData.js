import Papa from 'papaparse';

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

	return <button onClick={handleDowndloadData}>Download</button>;
};

export default DownloadData;
