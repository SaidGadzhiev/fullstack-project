import { useEffect, useState } from 'react';
import fetchRequest from '../admin/main_content/InventoryFiles/utils/fetchRequest';
import { updateItem } from '../admin/main_content/InventoryFiles/handleItem.js/updateItem';
import { useNavigate } from 'react-router-dom';

const ItemChoice = ({ items, chosenCat }) => {
	const [uniqueModels, setUniqueModels] = useState([]);
	const [selectedModel, setSelectedModel] = useState();
	const [selectedItems, setSelectedItems] = useState();
	const [radioButton, setRadioButton] = useState();
	const [buttonSwitch, setButtonSwitch] = useState(false);
	const [item, setItem] = useState();

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

	//retieve the right items depending on user preference
	const getItemsByModel = async () => {
		setButtonSwitch(true);
		try {
			const result = await fetch(`/items/key/model/${selectedModel}`);
			const parsedResult = await result.json();
			const filteredResult = parsedResult.data.filter(
				(item) => item.available === true
			);
			console.log('clicked  ', filteredResult);
			setSelectedItems(filteredResult);
			setButtonSwitch(false);
		} catch (err) {
			console.error('error getting items:', err);
		}
	};

	//call the getItemsByModel when user selects a model
	useEffect(() => {
		getItemsByModel();
	}, [selectedModel]);

	//reset chosen item and radiohead when switched to another cat
	useEffect(() => {
		setRadioButton(null);
	}, [chosenCat]);

	const handleModelSelect = (model) => {
		setSelectedModel(model);
		setRadioButton(model);
		console.log(selectedItems.length);
		console.log(selectedModel);
	};

	const getItem = () => {
		if (selectedItems) {
			const randomIndex = Math.floor(Math.random() * selectedItems.length);
			const chosenItem = selectedItems[randomIndex];
			setItem(chosenItem);
			console.log(item);
		}
	};

	useEffect(() => {
		getItem();
	}, [selectedItems]);

	const handleCategoryChoice = async (e) => {
		e.preventDefault();
		console.log(item);

		try {
			const res = await fetchRequest(() => updateItem(item._id, updatedValue));
			if (!res) {
				console.log('error updating item');
			} else {
				navigate('/confirmation');
			}
		} catch (err) {
			console.log(err);
		}
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
						{uniqueModels.map((model, key) => {
							return (
								<>
									<label key={key}>
										<input
											type='radio'
											name='item'
											value={model}
											checked={radioButton === model}
											onChange={(e) => handleModelSelect(e.target.value)}
										/>
										{model}
									</label>
								</>
							);
						})}
					</>
				)}

				{selectedModel && !buttonSwitch && <button>Submit</button>}
			</form>
		</>
	);
};
export default ItemChoice;
