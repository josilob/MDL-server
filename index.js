require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 27017;

const usersRouter = require('./controllers/user');
const drinksRouter = require('./controllers/drink');

// middleware
app.use(logger('tiny'));
app.use(cors()); // add cors headers
app.use(express.json()); // parse json bodies

// Default backend's route
app.get('/', (req, res) => {
	res.json({ status: 200, msg: 'Mixed-Drinks-Library API Running' });
});
// Use other routes
app.use('/user', usersRouter);
app.use('/drinks', drinksRouter);

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
