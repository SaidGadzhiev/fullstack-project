const itemByCategory = (array, currentCategory) => {
	const sorted = array.filter((cat) => cat.category === currentCategory);

	return sorted;
};

export default itemByCategory;
