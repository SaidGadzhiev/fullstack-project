import styled from 'styled-components';
import { IoSearch } from 'react-icons/io5';

//searchbar only works with serial number input in the field
const SearchBar = ({ setSearch }) => {
	return (
		<Input>
			<input
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Search by serial number'
			></input>
			<span>
				<IoSearch></IoSearch>
			</span>
		</Input>
	);
};

const Input = styled.div`
	display: inline-block;
	position: relative;
	input {
		width: 300px;

		border: none;
		height: 35px;
		padding-left: 40px;
		letter-spacing: 0.6px;

		padding-top: 5px;
		padding-bottom: 5px;
		font-size: 1rem;
		font-family: var(--font-poppins);
		opacity: 0.7;
		border-radius: 10px;
		transition: 0.4s;
	}
	input:focus {
		opacity: 1;
		outline: none;
	}
	span {
		position: absolute;
		top: 54%;
		left: 15px;
		font-size: 1.125rem;
		transform: translateY(-50%);
		@media (max-width: 550px) {
			top: 70%;
		}
	}
	svg {
		opacity: 0.4;
	}
`;

export default SearchBar;
