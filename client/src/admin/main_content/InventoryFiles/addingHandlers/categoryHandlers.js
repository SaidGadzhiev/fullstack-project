import { createCategory } from '../handleCategories/createCategory';
import fetchRequest from '../utils/fetchRequest';

//creating data in mongo Db that is passed by the user
const postData = async (newCat, setErrors, setIsOpen, getCategories, reset) => {
	try {
		const res = await fetchRequest(() => createCategory(newCat));
		if (!res.data) {
			setErrors(res.message);
		} else {
			setIsOpen(false);
			getCategories();
			reset();
		}
	} catch (err) {
		console.log(err);
	}
};

export default postData;
