const express = require('express');
const router = express.Router();
const User = require('../models/user');

// get all
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		// 500 error code means it happened on serverside (in DB)
		// nothing to do with the client
		res.status(500).json({ message: err.message });
	}
});
// get one
router.get('/:id', (req, res) => {});
// create one
router.post('/', (req, res) => {});
// update one
router.patch('/id', (req, res) => {});
// delete one
router.delete('/:id', (req, res) => {});

module.exports = router;
