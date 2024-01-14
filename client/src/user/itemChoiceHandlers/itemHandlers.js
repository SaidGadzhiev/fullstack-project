import { updateItem } from '../../admin/main_content/InventoryFiles/handleItem.js/updateItem';
import fetchRequest from '../../admin/main_content/InventoryFiles/utils/fetchRequest';

const getItemsByModel = async (
	setButtonSwitch,
	selectedModel,
	setSelectedItems
) => {
	setButtonSwitch(false);
	try {
		const result = await fetch(`/items/key/model/${selectedModel}`);
		const parsedResult = await result.json();
		const filteredResult = parsedResult.data.filter(
			(item) => item.available === true
		);
		setSelectedItems(filteredResult);
		setButtonSwitch(true);
	} catch (err) {
		console.error('error getting items:', err);
	}
};

export default getItemsByModel;

//assign the item chosen by user when selected items get updated
export const getItem = (selectedItems, setItem, setUserData, user) => {
	if (selectedItems) {
		const randomIndex = Math.floor(Math.random() * selectedItems.length);
		const chosenItem = selectedItems[randomIndex];
		if (chosenItem) {
			setItem(chosenItem);
			const currentDate = new Date();
			const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
			const formattedDate = currentDate.toLocaleString('en-US', options);
			setUserData((prevData) => ({
				...prevData,
				['item']: chosenItem.model,
				['serialNumber']: chosenItem.serialNumber,
				['borrowerName']: user.given_name,
				['email']: user.email,
				['category']: 'new',
				['date']: formattedDate,
			}));
		}
	}
};

//send item that needs to be updated to the database
export const handleItemData = async (id, updatedValue) => {
	try {
		const res = await fetchRequest(() => updateItem(id, updatedValue));
		if (!res) {
			console.log('error updating item');
		} else {
		}
	} catch (err) {
		console.log(err);
	}
};
