import ViewSingleItem from './ViewSingleItem';
import EditSingleItem from './EditSingleItem';
import { Fragment, useEffect, useState } from 'react';

const ViewItems = ({
	items,
	search,
	keys,
	handleCancelChange,
	getItems,
	handleIdChange,
	itemId,
}) => {
	return (
		<>
			{items
				.filter((item) => {
					return search.toLowerCase() === ''
						? item
						: item.serialNumber.toLowerCase().includes(search.toLowerCase());
				})
				.map((item, index) => {
					return (
						<Fragment key={item._id}>
							{itemId === item._id ? (
								<EditSingleItem
									keys={keys}
									item={item}
									index={index}
									handleCancelChange={handleCancelChange}
									getItems={getItems}
								/>
							) : (
								<ViewSingleItem
									keys={keys}
									item={item}
									index={index}
									getItems={getItems}
									handleIdChange={handleIdChange}
								/>
							)}
						</Fragment>
					);
				})}
		</>
	);
};
export default ViewItems;
