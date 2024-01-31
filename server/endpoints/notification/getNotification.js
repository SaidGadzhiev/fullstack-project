const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

//this is temporary file that is not used on the website, exisst mainly for any error fixes

const getNotification = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();
		const db = await client.db('fullstackProject');

		const resultTrue = await db
			.collection('notification')
			.findOne({ newNotification: true });

		const resultFalse = await db
			.collection('notification')
			.findOne({ newNotification: false });

		if (resultTrue) {
			res.status(200).json({ status: 200, data: resultTrue });
		} else if (resultFalse) {
			res.status(200).json({ status: 200, data: resultFalse });
		} else {
			res.status(404).json({ status: 404 });
		}
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = getNotification;
