const itemByCategory = (array, currentCategory) => {
	if (Array.isArray(array)) {
		const sorted = array.filter((cat) => cat.category === currentCategory);
		return sorted;
	} else {
		return [];
	}
};

export default itemByCategory;
