const mongoose = require('mongoose');
// const { Schema, model } = require('../models/FavoriteDrink');

const drinkSchema = new mongoose.Schema({
	drinkName: { type: String, required: true },
	drinkImage: { type: String, trim: true },
	idDrink: { type: String },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

//                             (name of the model in DB & Schema name)
module.exports = mongoose.model('FavoriteDrink', drinkSchema);
