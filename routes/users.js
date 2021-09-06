// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // get all
// router.get('/', async (req, res) => {
// 	try {
// 		const users = await User.find();
// 		res.json(users);
// 	} catch (err) {
// 		// 500 error code means it happened on serverside (in DB)
// 		// nothing to do with the client
// 		res.status(500).json({ message: err.message });
// 	}
// });

// module.exports = router;
