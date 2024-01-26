//this handler is specifically to handle the syntax for each key, since they come from
//mongo db, they are camelCased. i used couple of 'replace' methods to achieve an effect of
//proper syntax

const convertKeys = (requests) => {
	const convertedKeys = [];
	for (const key in requests) {
		if (Object.prototype.hasOwnProperty.call(requests, key)) {
			const convertedKey = key
				.replace(/([a-z])([A-Z])/g, '$1 $2') //insert space between lowercase and uppercase letter
				.replace(/([A-Z])/g, '$1') // Add space before each capital letter
				.replace(/^./, (str) => str.toUpperCase()) // Capitalize the first character
				.trim();

			convertedKeys.push(convertedKey);
		}
	}
	return convertedKeys;
};

export default convertKeys;
