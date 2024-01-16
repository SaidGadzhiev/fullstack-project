import { useEffect, useState } from 'react';
import getItemsByModel, { getItem } from './itemChoiceHandlers/itemHandlers';

const ItemChoice = ({
	items,
	chosenCat,
	user,
	setUserData,
	setItem,
	setButtonSwitch,
	selectedModel,
	setSelectedModel,
}) => {
	const [uniqueModels, setUniqueModels] = useState([]);
	const [selectedItems, setSelectedItems] = useState();
	const [radioButton, setRadioButton] = useState();

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
		getItem(selectedItems, setItem, setUserData, user);
	}, [selectedItems]);

	return (
		<>
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
		</>
	);
};
export default ItemChoice;
