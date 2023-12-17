const sortingByCategory = (array, currentCategory) => {
	const sorted = array.filter((cat) => cat.categoryName === currentCategory);

	return sorted;
};

export default sortingByCategory;
