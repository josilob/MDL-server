require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const app = express();

const { DB_URL } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true });

app.use(express.json());

app.use('/users', usersRouter);

const PORT = 27017 || process.env.PORT;

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));

app.listen(27017, () => console.log(`Express server listening on port 27017`));
