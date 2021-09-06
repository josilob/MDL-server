require('dotenv').config();
const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); //bcrypt for password hashing
const jwt = require('jsonwebtoken'); // jwtoken for sign in

const router = Router(); // Router for routes bundle
const { SECRET = 'defaultSecret' } = process.env;

// Register route to create a new user
router.post('/register', async (req, res) => {
	try {
		// hash the password
		req.body.password = await bcrypt.hash(req.body.password);
		// create a new user
		const user = await User.create(req.body);
		// send new user as response
		res.json(user);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Login route to verify a user and get a token
router.post('/login', async (req, res) => {
	try {
		if (!email || !password) {
			return new ErrorResponse('Please provide an email and password', 400);
		}
		// check if the user exists
		const user = await User.findOne({ username: req.body.username });
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
		res.status(400).json({ error });
	}
});

module.exports = router;
