import styled from 'styled-components';
//show the user the content is loading or the change that's been made
const Loader = () => {
	return <Spinner className='spinner'></Spinner>;
};

const Spinner = styled.div`
	width: 20px;
	height: 20px;
	display: inline-block;
	border: 2.5px solid #178080;
	border-radius: 50%;
	border-top-color: transparent;
	border-bottom-color: transparent;
	animation: rot5 1s infinite;

	@keyframes rot5 {
		0% {
			transform: rotate(0);
		}

		50% {
			transform: rotate(180deg);
			border-top-color: #178080;
			border-bottom-color: #178080;
			border-right-color: transparent;
			border-left-color: transparent;
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;

export default Loader;
