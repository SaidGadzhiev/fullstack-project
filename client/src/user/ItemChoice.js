import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getItemsByModel, {
	getItem,
	handleItemData,
} from './itemChoiceHandlers/itemHandlers';
import handleUserData from './itemChoiceHandlers/handleUserData';

const ItemChoice = ({ items, chosenCat }) => {
	const [uniqueModels, setUniqueModels] = useState([]);
	const [selectedModel, setSelectedModel] = useState();
	const [selectedItems, setSelectedItems] = useState();
	const [radioButton, setRadioButton] = useState();
	const [buttonSwitch, setButtonSwitch] = useState(false);
	const [item, setItem] = useState();

	const [userData, setUserData] = useState({});

	const navigate = useNavigate();

	//to put the item unavailable in admin page, when chosen by user
	const updatedValue = {
		available: false,
	};

	//get models name from the items to showcase to user
	const models = items
		.filter((item) => item.available === true)
		.map((item) => item.model);
	useEffect(() => {
		setUniqueModels([...new Set(models)]);
	}, [items]);

	//call the getItemsByModel when user selects a model
	useEffect(() => {
		getItemsByModel(setButtonSwitch, selectedModel, setSelectedItems);
	}, [selectedModel]);

	//reset chosen item and radiohead when switched to another cat
	useEffect(() => {
		setRadioButton(null);
		setButtonSwitch(false);
	}, [chosenCat]);

	const handleModelSelect = (model) => {
		setSelectedModel(model);
		setRadioButton(model);
	};

	useEffect(() => {
		getItem(selectedItems, setItem, setUserData);
	}, [selectedItems]);

	const handleCategoryChoice = async (e) => {
		e.preventDefault();
		handleUserData(userData);
		handleItemData(item._id, updatedValue);
		navigate('/confirmation');
	};

	return (
		<>
			<form
				onSubmit={(e) => {
					handleCategoryChoice(e);
				}}
			>
				{selectedItems && (
					<>
						{models.length === 0 ? (
							<>sorry, choose another item!</>
						) : (
							<>
								{uniqueModels.map((model, key) => {
									return (
										<label key={model}>
											<input
												type='radio'
												name='item'
												value={model}
												checked={radioButton === model}
												disabled={uniqueModels.length === 0}
												onChange={(e) => handleModelSelect(e.target.value)}
											/>
											{model}
										</label>
									);
								})}
							</>
						)}
					</>
				)}

				{selectedModel && buttonSwitch && <button>Submit</button>}
			</form>
		</>
	);
};
export default ItemChoice;
