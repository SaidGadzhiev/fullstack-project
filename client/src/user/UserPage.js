import { useEffect, useState } from 'react';
import ItemChoice from './ItemChoice';
import LogoutButton from './sign in folder/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import SignIn from './sign in folder/SignIn';
import { handleItemData } from './itemChoiceHandlers/itemHandlers';
import handleUserData from './itemChoiceHandlers/handleUserData';
import styled from 'styled-components';
import Confirmation from './Confirmation';

//contains all the coomponents of use form: itemchoice and confirmation
const UserPage = () => {
	const [categories, setCategories] = useState([]);
	const [chosenCat, setChosenCat] = useState();
	const [items, setItems] = useState([]);
	const [userData, setUserData] = useState({});
	const [item, setItem] = useState();
	const [buttonSwitch, setButtonSwitch] = useState(false);
	const [selectedModel, setSelectedModel] = useState();
	const { user, isAuthenticated } = useAuth0();
	const [isSelected, setIsSelected] = useState();
	const [borrowed, setBorrowed] = useState(false);

	//to put the item unavailable in admin page, when chosen by user
	const updatedValue = {
		available: false,
	};

	const getCategories = async () => {
		const result = await fetch(`/categories/`);
		const parsedResult = await result.json();
		setCategories(parsedResult.data);
	};

	const getItems = async () => {
		try {
			const result = await fetch(`/items/key/category/${chosenCat}`);
			const parsedResult = await result.json();
			setItems(parsedResult.data);
		} catch (err) {
			console.error('error getting items:', err);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		getItems();
	}, [chosenCat]);

	const handleOptionChange = (value) => {
		setIsSelected(value);
		setChosenCat(value);
	};

	const handleCategoryChoice = async (e) => {
		e.preventDefault();
		handleUserData(userData);
		handleItemData(item._id, updatedValue);
		setBorrowed(true);
	};

	return (
		<>
			{!isAuthenticated ? (
				<SignIn />
			) : (
				<>
					<LogoutButton />

					{!borrowed ? (
						<>
							{categories.length < 1 ? (
								<>hold on</>
							) : (
								<Selection>
									<h3>Select your item</h3>

									<Form
										onSubmit={(e) => {
											handleCategoryChoice(e);
										}}
									>
										<CategoryList>
											{categories.map((cat, key) => {
												return (
													<label
														key={key}
														className={
															isSelected === cat.name ? 'selected' : 'false'
														}
													>
														<input
															type='radio'
															name='category'
															value={cat.name}
															onClick={(e) =>
																handleOptionChange(e.target.value)
															}
														/>
														<p>{cat.name}</p>
													</label>
												);
											})}
										</CategoryList>

										<Line></Line>

										<ModelList>
											{chosenCat && (
												<ItemChoice
													items={items}
													chosenCat={chosenCat}
													user={user}
													setUserData={setUserData}
													setItem={setItem}
													setButtonSwitch={setButtonSwitch}
													selectedModel={selectedModel}
													setSelectedModel={setSelectedModel}
												/>
											)}
										</ModelList>
										{selectedModel && buttonSwitch && (
											<Button>Confirm your choice</Button>
										)}
									</Form>
								</Selection>
							)}
						</>
					) : (
						<>
							<Confirmation userData={userData} />
						</>
					)}
				</>
			)}
		</>
	);
};

const Selection = styled.div`
	font-family: var(--font-ubuntu);
	font-weight: bold;
	text-transform: capitalize;
	color: #676767;
	max-width: 613px;
	background-color: #ffffffcc;
	padding: 40px;
	border-radius: 30px;
	margin: 0 auto;
	margin-top: 15vh;
	box-shadow: 0px -4px 10px 2px rgba(0, 0, 0, 0.07);

	h3 {
		margin-top: 0;
		margin-bottom: 0px;
	}

	label {
		background-color: #f4f0ec;
		display: flex;
		flex-direction: row;
		margin-top: 45px;
		width: 193px;
		height: 70px;
		align-items: center;
		border-radius: 30px;
		padding-left: 20px;
		position: relative;
		border: 2px #f4f0ec solid;
		transition: 0.2s;

		cursor: pointer; /* Add pointer cursor to indicate interactivity */

		input[type='radio'] {
			display: none;
		}
		:before {
			content: ' ';
			display: inline-block;
			margin: 0 5px 0 0;
			width: 12px;
			position: relative;
			top: 2px;
			height: 12px;
			border-radius: 11px;
			border: 2px solid #ffffffcc;
			background-color: #ffffffcc;
			transition: 0.4s;
		}

		input[type='radio']:checked + :before {
			float: left;
			border-radius: 11px;
			display: block;
			background-color: #178080;
		}

		input[type='radio']:checked + & {
			background-color: #178080;
			border: 1px solid black;
		}

		&:hover {
			border: 2px #178080 solid;
			:before {
				border: 2px solid #178080;
			}
		}
	}

	.selected,
	.selectedModel {
		background-color: #1780803d;
		border: 2px #178080 solid;
		&:hover {
			:before {
				border: 2px solid #ffffffcc;
			}
		}
	}
`;

const Form = styled.form`
	align-items: flex-start;
	display: flex;
	flex-wrap: wrap;

	flex-direction: row;
	justify-content: space-between;
	position: relative;
	transition: 0.2s;
`;

const Line = styled.span`
	display: inline-block;
	width: 2px; /* Adjust the width of the line */
	height: 90%; /* Adjust the thickness of the line */
	background-color: #178080; /* Adjust the color of the line */
	margin: 10px 5px; /* Adjust the margin around the line */
	border-radius: 10px;
	position: absolute;
	left: 50%;
	top: 10%;
`;

const Button = styled.button`
	position: relative;
	margin-top: 50px;
	left: 70%;
	font-family: var(--font-ubuntu);
	font-size: 1.125rem;
	font-weight: bold;
	background-color: transparent;
	border: none;
	color: #178080;
	cursor: pointer;
`;

const CategoryList = styled.div`
	max-width: 300px;
	width: 100%;
`;

const ModelList = styled.div``;

export default UserPage;
