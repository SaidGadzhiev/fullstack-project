const SearchBar = ({ search, setSearch }) => {
	return (
		<>
			<label></label>
			<input
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Search by serial number'
			></input>
		</>
	);
};

export default SearchBar;
