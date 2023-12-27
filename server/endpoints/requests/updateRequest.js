const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const updateRequest = async (req, res) => {
	const client = new MongoClient(MONGO_URI);
	const { id } = req.params;
	const updateData = req.body;

	console.log(updateData);

	try {
		await client.connect();
		const db = await client.db('fullstackProject');

		const result = await db
			.collection('requests')
			.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
		console.log(result);

		res.status(200).json({ status: 200, data: result });
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = updateRequest;
