const sortingByCategory = (array, currentCategory) => {
	if (Array.isArray(array)) {
		const sorted = array.filter((cat) => cat.categoryName === currentCategory);

		return sorted;
	} else {
		return [];
	}
};

export default sortingByCategory;
