const { Router } = require('express');

// importing as destructured Object (named export) and FavoriteDrink as default export
const { User } = require('../models/User');
const FavoriteDrink = require('../models/FavoriteDrink');

const router = Router();

//get all drinks of a user
router.get('/get/:userid', async (req, res) => {
	try {
		const usersDrinks = await FavoriteDrink.find({
			user: req.params.userid
		});

		res.status(200).json(usersDrinks);
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

		res.status(200).json({ favoriteDrink });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
// delete specific drink
router.delete('/delete/:id', async (req, res) => {
	try {
		await FavoriteDrink.findOneAndDelete({ _id: req.params.id });
		res.status(200).json({
			message: `Drink successfully removed`
		});
	} catch (error) {
		res.json({ error: error.message });
	}
});

module.exports = router;
