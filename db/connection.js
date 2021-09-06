require('dotenv').config();
const mongoose = require('mongoose');
const { DB_URL } = process.env;

mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection
	.on('connected', () => console.log('DB connected '))
	.on('disconnected', () => console.log('DB disconnected '))
	.on('error', (error) => console.error(error));

module.exports = mongoose;
