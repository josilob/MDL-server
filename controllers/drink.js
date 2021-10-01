const { Router } = require('express');
const User = require('../models/User');
const FavoriteDrink = require('../models/FavoriteDrink');
const router = Router();

//get all drinks of a user
router.get('/get/:userid', async (req, res) => {
	try {
		const usersDrinks = await FavoriteDrink.find({
			user: req.params.userid
		});
		res.json({ usersDrinks });
	} catch (error) {
		res.json({ error: error.message });
	}
});

router.post('/add', async (req, res) => {
	const { drink, id, image, user } = req.body;
	try {
		// create a new drink
		const favoriteDrink = await FavoriteDrink.create({
			drinkName: drink,
			idDrink: id,
			drinkImage: image,
			user
		});

		FavoriteDrink.findOne({ user })
			.populate({
				path: 'user'
			})
			.exec(function (err, favoriteDrink) {
				if (err) return handleError(err);
				console.log('The drink is %s', favoriteDrink.drinkName);
			});

		res.status(200).json({ favoriteDrink });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
// delete specific drink
router.delete('/drinks/delete/:id', async (req, res) => {
	try {
		await User.findOneAndDelete({ _id: req.params.id });
		res.json({
			status: 200,
			message: `Drink with ID : ${req.params.id} is removed`
		});
	} catch (error) {
		res.json({ error: error.message });
	}
});

module.exports = router;
