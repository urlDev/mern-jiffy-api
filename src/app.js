const express = require('express');
require('./db/db');
const userRouter = require('./routers/user');
const favoriteRouter = require('./routers/favorite');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(favoriteRouter);

module.exports = app;
