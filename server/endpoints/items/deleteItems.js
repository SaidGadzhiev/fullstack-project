const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const deleteItems = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	const { key, value } = req.params;

	const filter = { [key]: value };
	console.log(filter);

	try {
		await client.connect();
		const db = await client.db('fullstackProject');
		const _id = new ObjectId(req.params.id);
		console.log(_id);

		const result = await db.collection('items').deleteMany(filter);

		result
			? res.status(200).json({ status: 200, data: result })
			: res.status(404).json({ status: 404, message: 'something is wrong' });
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = deleteItems;
