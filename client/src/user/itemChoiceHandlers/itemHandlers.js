import { updateItem } from '../../admin/main_content/InventoryFiles/handleItem.js/updateItem';
import fetchRequest from '../../admin/main_content/InventoryFiles/utils/fetchRequest';

//get items depending on the model selected
// const getItemsByModel = async (
// 	setButtonSwitch,
// 	setSelectedItems,
// 	selectedModel
// ) => {
// 	try {
// 		const result = await fetch(`/items/key/model/${selectedModel}`);
// 		const parsedResult = await result.json();
// 		const filteredResult = parsedResult.data.filter(
// 			(item) => item.available === true
// 		);
// 		console.log('clicked  ', filteredResult);
// 		setButtonSwitch(false);
// 		return filteredResult;
// 	} catch (err) {
// 		console.error('error getting items:', err);
// 	}
// };

// export default getItemsByModel;

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
