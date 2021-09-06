const { Schema, model } = require('../models/FavoriteDrink');

const DrinkSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true, minlength: 6, trim: true },
	id: { type: String }
	// favoriteDrinks: [
	// 	{ type: mongoose.Schema.Types.ObjectId, ref: 'FavoriteDrink' }
	// ]
});

//                             (name of the model in DB, Schema corresponding to the model)
module.exports = mongoose.model('Drink', DrinkSchema);
