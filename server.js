require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const usersRouter = require('./routes/users');

const app = express();

const { DB_URL } = process.env;
const PORT = process.env.PORT || 27017;

// middleware
app.use(express.json());
app.use(logger('tiny'));

app.use('/users', usersRouter);

// connect to Mongo
mongoose.connect(DB_URL, { useNewUrlParser: true });

// upon CONNECTION
const db = mongoose.connection;
db.on('connected', () => console.log('Db connected '));
db.on('disconnected', () => console.log('Db disconnected '));
db.on('error', (error) => console.error(error));

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
