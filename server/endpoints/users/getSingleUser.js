const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const validator = require('validator');
const bcrypt = require('bcrypt');

const getSingleUser = async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);

	const client = new MongoClient(MONGO_URI);

	try {
		await client.connect();
		const db = await client.db('fullstackProject');

		const user = await db.collection('users').findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'check your email and password' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(400).json({ message: 'check your email and password' });
		} else {
			console.log(user);
			res.status(200).json({ status: 200, data: user });
		}
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};
module.exports = getSingleUser;
