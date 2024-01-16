import { useEffect, useState } from 'react';
import ItemChoice from './ItemChoice';
import LogoutButton from './sign in folder/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import SignIn from './sign in folder/SignIn';
import { useNavigate } from 'react-router-dom';
import { handleItemData } from './itemChoiceHandlers/itemHandlers';
import handleUserData from './itemChoiceHandlers/handleUserData';

const UserPage = () => {
	const [categories, setCategories] = useState([]);
	const [chosenCat, setChosenCat] = useState();
	const [items, setItems] = useState([]);
	const [userData, setUserData] = useState({});
	const [item, setItem] = useState();
	const [buttonSwitch, setButtonSwitch] = useState(false);
	const [selectedModel, setSelectedModel] = useState();
	const { user, isAuthenticated } = useAuth0();

	const navigate = useNavigate();

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
		setChosenCat(value);
	};

	const handleCategoryChoice = async (e) => {
		e.preventDefault();
		handleUserData(userData);
		handleItemData(item._id, updatedValue);
		navigate('/confirmation');
	};

	return (
		<>
			{!isAuthenticated ? (
				<SignIn />
			) : (
				<>
					{categories.length < 1 ? (
						<>hold on</>
					) : (
						<>
							<h1>Please select the item you want to borrow</h1>

							<form
								onSubmit={(e) => {
									handleCategoryChoice(e);
								}}
							>
								{categories.map((cat, key) => {
									return (
										<label key={key}>
											<input
												type='radio'
												name='category'
												value={cat.name}
												onClick={(e) => handleOptionChange(e.target.value)}
											/>
											{cat.name}
										</label>
									);
								})}
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
								{selectedModel && buttonSwitch && <button>Submit</button>}
							</form>
						</>
					)}

					<LogoutButton />
				</>
			)}
		</>
	);
};

export default UserPage;
