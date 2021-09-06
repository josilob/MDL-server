const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true, minlength: 6, trim: true },
		email: { type: String, required: true, unique: true, trim: true }
		// favoriteDrinks: [
		// 	{ type: mongoose.Schema.Types.ObjectId, ref: 'FavoriteDrink' }
		// ]
	},
	{ timestamps: true }
);

//                             (name of the model in DB, Schema corresponding to the model)
module.exports = mongoose.model('User', userSchema);
