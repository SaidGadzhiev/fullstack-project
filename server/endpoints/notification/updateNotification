const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

//this is temporary file that is not used on the website, exisst mainly for any error fixes

const updateNotification = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();
		const db = await client.db('fullstackProject');

		const result = await db
			.collection('notification')
			.updateOne(
				{ newNotification: true },
				{ $set: { newNotification: false } }
			);

		if (result) {
			res.status(200).json({ status: 200, data: result });
		} else {
			res.status(404).json({ status: 404, message: 'error' });
		}
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = updateNotification;
