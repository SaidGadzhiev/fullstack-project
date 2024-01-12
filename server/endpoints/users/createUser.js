const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const validator = require('validator');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	const { username, email, password, role } = req.body;

	const newUser = req.body;

	const errors = [];

	//valditing password
	if (!validator.isStrongPassword(password)) {
		errors.push({
			passwordError:
				'Make sure your password is at least 8 characters long. Contains at least one lowercase letter. Contains at least one uppercase letter. Contains at least one digit. Contains at least one special character',
		});
	}

	//valditing name
	const isValidUserName = (username) => {
		return (
			typeof username === 'string' &&
			username.length >= 2 &&
			username.length <= 15
		);
	};
	if (!isValidUserName(username)) {
		errors.push({
			userError:
				'Make sure to only use letters. Name should be between 2 and 15 characters',
		});
	}

	//valditing email
	if (!validator.isEmail(email)) {
		errors.push({
			emailError: 'Make sure to include @ and . in your email!',
		});
	}

	async function hashPassword(password) {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		return hashedPassword;
	}

	if (errors.length > 0) {
		return res.status(400).json({ errors });
	} else {
		hashPassword(password).then((hashedPassword) => {
			newUser.password = hashedPassword;
		});

		try {
			await client.connect();
			const db = await client.db('fullstackProject');

			const existingUser = await db.collection('users').findOne({
				$or: [{ username: newUser.username }, { email: newUser.email }],
			});

			if (existingUser) {
				res
					.status(409)
					.json({ status: 409, message: 'user or email already taken' });
			} else {
				const result = await db
					.collection('users')
					.insertOne({ _id: new ObjectId(), ...newUser });
				console.log(newUser);

				res.status(200).json({ status: 200, data: result });
			}
		} catch (err) {
			res.status(500).json({ status: 500, message: err.message });
		} finally {
			client.close();
		}
	}
};
module.exports = createUser;
