const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const createItem = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	const newItem = req.body;
	console.log(newItem);

	const filter = {
		['serialNumber']: newItem.serialNumber,
		['category']: newItem.category,
	};
	console.log(filter, 'this is filter');

	try {
		await client.connect();
		const db = await client.db('fullstackProject');

		const existingResult = await db.collection('items').findOne(filter);

		if (existingResult) {
			res.status(409).json({
				status: 409,
				message: 'The serial number of this item already exists',
			});
		} else {
			const result = await db
				.collection('items')
				.insertOne({ _id: new ObjectId(), ...newItem });
			console.log(result);

			res.status(200).json({ status: 200, data: result });
		}
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = createItem;
