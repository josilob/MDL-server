// import Schema and model as destructured keys from mongoose object
const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
	drinkName: { type: String, required: true, unique: true },
	drinkImage: { type: String, trim: true },
	idDrink: { type: String, unique: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

//                             (model name & Schema name)
const FavoriteDrink = model('FavoriteDrink', drinkSchema);
module.exports = FavoriteDrink;
