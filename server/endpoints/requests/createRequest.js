const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const createRequest = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	const newRequest = req.body;
	console.log(newRequest);

	try {
		await client.connect();
		const db = await client.db('fullstackProject');

		//updating the notification value when user sends his data to mongo db
		const notificationUpdate = await db
			.collection('notification')
			.updateMany(
				{ newNotification: false },
				{ $set: { newNotification: true } }
			);

		const result = await db
			.collection('requests')
			.insertOne({ _id: new ObjectId(), ...newRequest });
		console.log(result);

		res.status(200).json({ status: 200, data: result });
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = createRequest;
