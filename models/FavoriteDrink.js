// import Schema and model as destructured keys from mongoose object
const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
	drinkName: { type: String, required: true },
	drinkImage: { type: String, trim: true },
	idDrink: { type: String },
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

//                             (model name & Schema name)
const FavoriteDrink = model('FavoriteDrink', drinkSchema);
module.exports = FavoriteDrink;
