import { useEffect, useState } from 'react';
import fetchRequest from './utils/fetchRequest';
import { updateItem } from './handleItem.js/updateItem';
import styled from 'styled-components';
import { FiSave } from 'react-icons/fi';
import { FcCancel } from 'react-icons/fc';
import Loader from '../../../Loader';

const EditSingleItem = ({
	keys,
	item,
	index,
	handleCancelChange,
	getItems,
}) => {
	const [itemData, editFormData] = useState(item);
	const [disabled, setDisabled] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	useEffect(() => {
		editFormData(item);
	}, [item]);

	const changedValues = {};

	const handleOptionChange = (key, e) => {
		setSelectedOption(e.target.value);
		editFormData((prevData) => ({
			...prevData,
			[key]: e.target.value === 'yes',
		}));
	};

	const handleInputChange = (key, e) => {
		editFormData((prevData) => ({ ...prevData, [key]: e.target.value }));
	};
	const handleSaveChange = async (e) => {
		e.preventDefault();
		setDisabled(true);
		//checks which value are different from the previous item data
		for (const key in itemData) {
			if (itemData.hasOwnProperty(key) && item[key] !== itemData[key]) {
				changedValues[key] = itemData[key];
			}
		}

		try {
			const res = await fetchRequest(() =>
				updateItem(itemData._id, changedValues)
			);
			if (!res) {
				console.log('error updating item');
			}
		} catch (err) {
			console.log(err);
		}
		setDisabled(false);

		getItems();

		handleCancelChange();
	};

	return (
		<>
			<Inputs key={index}>
				{keys.map((key) => {
					if (key !== 'category') {
						if (itemData[key] === false) {
							return (
								<td key={key}>
									<select
										onChange={(e) => handleOptionChange(key, e)}
										type='select'
										required
										placeholder='select'
									>
										<option></option>
										<option value='yes'>YES</option>

										<option value='no'>NO</option>
									</select>
								</td>
							);
						} else if (itemData[key] === true) {
							return (
								<td key={key}>
									<select
										onChange={(e) => handleOptionChange(key, e)}
										type='select'
										required
										placeholder='select'
									>
										<option></option>
										<option value='yes'>YES</option>
										<option value='no'>NO</option>
									</select>
								</td>
							);
						} else {
							return (
								<td key={key}>
									<input
										onChange={(e) => handleInputChange(key, e)}
										required
										value={itemData[key]}
									></input>
								</td>
							);
						}
					}
				})}
				<td>
					{!disabled ? (
						<>
							<EditButton type='button' onClick={(e) => handleSaveChange(e)}>
								<FiSave />
							</EditButton>

							<EditButton
								type='button'
								onClick={(e) => handleCancelChange(e, item._id)}
							>
								<FcCancel />
							</EditButton>
						</>
					) : (
						<div>
							<Loader />
						</div>
					)}
				</td>
			</Inputs>
		</>
	);
};

const Inputs = styled.tr`
	input,
	select {
		font-family: var(--font-poppins);
		font-size: 1rem;
		border-radius: 5px;
		border: 1px solid #17808042;
		margin-left: -10px;
		padding-left: 10px;
		opacity: 0.5;
		transition: 0.2s;
		&:focus {
			opacity: 1;

			outline: none;
			border: 1px solid #035555;
		}
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

export default EditSingleItem;
