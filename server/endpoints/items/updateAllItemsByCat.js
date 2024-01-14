const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const _ = require('lodash');

const updateAllItemsByCat = async (req, res) => {
	const client = new MongoClient(MONGO_URI);
	const updateData = req.body;

	const oldKey = _.camelCase(updateData.oldKey);
	const newKey = _.camelCase(updateData.newKey);

	const { key, value } = req.params;
	const filter = { [key]: value };

	try {
		await client.connect();
		const db = await client.db('fullstackProject');

		const result = await db
			.collection('items')
			.updateMany(filter, { $rename: { [oldKey]: newKey } });

		result
			? res.status(200).json({ status: 200, data: result })
			: res.status(404).json({ status: 404, message: 'something is wrong' });
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};
module.exports = updateAllItemsByCat;
