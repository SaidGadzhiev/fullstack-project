const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const updateCategory = async (req, res) => {
	console.log('this is body', req.body);
	const changes = req.body;
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();
		const db = await client.db('fullstackProject');
		// const _id = new ObjectId(req.params.id);
		const id = req.params.id;

		const filter = { _id: new ObjectId(id) };
		const update = { $set: { 'attributes.$[elem].key': changes.newKey } };
		const options = { arrayFilters: [{ 'elem.key': changes.oldKey }] };

		const changedCategory = await db
			.collection('categories')
			.updateOne(filter, update, options);

		if (changedCategory) {
			changedCategory.modifiedCount > 0
				? res.status(200).json({
						status: 200,
						data: changedCategory,
						message: 'Your category has been updated',
				  })
				: res.status(404).json({ status: 404, message: 'something is wrong' });
		}
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = updateCategory;
