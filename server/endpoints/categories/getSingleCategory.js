const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const getSingleCategory = async (req, res) => {
	const client = new MongoClient(MONGO_URI);
	try {
		await client.connect();
		const db = await client.db('fullstackProject');
		// const _id = new ObjectId(req.params.id);
		const { key, value } = req.params;
		const filter = { [key]: value };
		console.log(filter);
		const result = await db.collection('categories').findOne(filter);
		console.log(result);

		result
			? res.status(200).json({ status: 200, data: result })
			: res.status(404).json({ status: 404, message: 'something is wrong' });
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = getSingleCategory;
