import DeleteItem from './DeleteItem';
import { IoMdCheckmark } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';

import styled from 'styled-components';

// renders the tr and td of each iteme depending on tha cateory selected
const ViewSingleItem = ({
	keys,
	item,
	index,
	handleIdChange,
	getItems,
	handleCheckboxClick,
}) => {
	return (
		<>
			<TR key={index}>
				{keys.map((key) => {
					//some filtering to use icons for boolean values
					if (key !== 'category') {
						if (item[key] === false) {
							return (
								<td key={key} className='icon-text'>
									<IoCloseSharp className='no' />
								</td>
							);
						} else if (item[key] === true) {
							return (
								<td key={key} className='icon-text'>
									<IoMdCheckmark className='yes' />
								</td>
							);
						} else if (key === 'serialNumber') {
							return <td key={key}>{item[key]}</td>;
						} else {
							return <td key={key}>{item[key]}</td>;
						}
					}
					return null;
				})}

				<td>
					{/* when clicked, the handleIdChange is passed to ViewItems to select the item needed for modifications */}
					<EditButton type='button' onClick={(e) => handleIdChange(e, item)}>
						<MdModeEdit />
					</EditButton>

					<DeleteItem item={item} getItems={getItems} />
				</td>
			</TR>
		</>
	);
};

const TR = styled.tr`
	.icon-text {
		text-align: center;
	}

	svg {
		font-size: 1.5rem;
	}

	.yes {
		margin-right: 40%;

		color: #178080;
	}
	.no {
		margin-right: 40%;
		color: #e20000;
	}
`;

const EditButton = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 1.5rem;
	opacity: 0.6;
	transition: 0.3s;
	margin-right: 15px;
	&:hover {
		opacity: 1;
	}
`;

export default ViewSingleItem;
