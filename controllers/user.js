require('dotenv').config();
const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); //bcrypt for password hashing
const jwt = require('jsonwebtoken'); // jwtoken for sign in

const router = Router(); // Router for routes bundle
const { SECRET = 'defaultSecret' } = process.env;

// Register route to create a new user
router.post('/register', async (req, res) => {
	const { username, email, password, confirmPassword } = req.body;
	try {
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exist.' });
		}
		if (password !== confirmPassword)
			return res.status(400).json({ message: 'Passwords do not match' });

		// HASHED PASSWORD
		req.body.password = await bcrypt.hash(password, 10);
		// create a new user
		const user = await User.create(req.body);
		// send new user as response
		res.status(200).json({ data: user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Login route to verify a user and get a token
router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		if (!username || !password) {
			return res.status(400).send('Please provide username and password.');
		}
		// check if the user exists
		const user = await User.findOne({ username });
		if (user) {
			//check if password matches
			const result = await bcrypt.compare(req.body.password, user.password);
			if (result) {
				// sign token and send it in response
				const token = await jwt.sign({ username: user.username }, SECRET);
				res.json({ token });
			} else {
				res.status(400).json({ error: "password doesn't match" });
			}
		} else {
			res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// ROUTES FOR DEVELOPMENT

//get all users
router.get('/get/all', async (req, res) => {
	try {
		const allUsers = await User.find();
		res.json({ message: 'List of all users', allUsers });
	} catch (error) {
		res.json({ error: error.message });
	}
});

// delete all users
router.delete('/delete/all', async (req, res) => {
	try {
		await User.deleteMany();
		res.json({ status: 200, message: 'Users collection cleared' });
	} catch (error) {
		res.json({ error: error.message });
	}
});

// delete specific user
router.delete('/delete/:username', async (req, res) => {
	try {
		await User.findOneAndDelete(req.params.username);
		res.json({ status: 200, message: `User ${req.params.username} is removed` });
	} catch (error) {
		res.json({ error: error.message });
	}
});

module.exports = router;
