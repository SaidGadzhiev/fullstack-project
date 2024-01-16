import styled from 'styled-components';

const SearchBar = ({ search, setSearch }) => {
	return (
		<Input>
			<input
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Search by serial number'
			></input>
		</Input>
	);
};

const Input = styled.div`
	input {
		width: 400px;
		border: none;
		height: 35px;
		padding-left: 10px;
		font-family: var(--font-ubuntu);
		font-weight: 600;
		font-size: 1.125rem;
		opacity: 0.8;
		border-radius: 7px;
	}
	input:focus {
		opacity: 1;
		outline: none;
	}
`;

export default SearchBar;
