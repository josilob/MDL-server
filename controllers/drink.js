const { Router } = require('express');
const User = require('../models/User');
const FavoriteDrink = require('../models/FavoriteDrink');
const router = Router();

//get all drinks of a user
router.get('/:username', async (req, res) => {
	try {
		const usersDrinks = await User.find({
			username: req.params.username
		}).populate('favoriteDrinks');
		res.json({
			// message: `List of ${req.params.username}'s favorite drinks`,
			usersDrinks
		});
	} catch (error) {
		res.json({ error: error.message });
	}
});

router.post('/add', async (req, res) => {
	const { drinkName, idDrink, drinkImage, owner } = req.body;
	try {
		// create a new drink
		const user = await User.findOne({ username: owner });
		const ownerId = owner._id;
		const drink = await FavoriteDrink.create({
			drinkName,
			idDrink,
			drinkImage,
			ownerId
		});
		User.find({ username: owner })
			.populate('favoriteDrinks')
			.exec(function (error, FavoriteDrink) {
				if (error) {
					callback(error, null);
				} else {
					callback(null, FavoriteDrink);
				}
			});

		res.status(200).json({ drink });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// delete specific user
// router.delete('/delete/:id', async (req, res) => {
// 	try {
// 		await User.findOneAndDelete({ _id: req.params.id });
// 		res.json({ status: 200, message: `User ${req.params.id} is removed` });
// 	} catch (error) {
// 		res.json({ error: error.message });
// 	}
// });

module.exports = router;
