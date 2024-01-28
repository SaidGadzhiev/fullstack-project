const { filter } = require('lodash');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const createCategory = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	const newItem = req.body;
	console.log(newItem);

	const filter = { ['name']: newItem.name };
	console.log(filter);

	try {
		await client.connect();
		const db = await client.db('fullstackProject');

		const existingResult = await db.collection('categories').findOne(filter);

		if (existingResult) {
			res.status(409).json({
				status: 409,
				message: 'A category with this name already exists',
			});
		} else {
			const result = await db
				.collection('categories')
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

module.exports = createCategory;
