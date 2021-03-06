const express = require('express');
require('./db/db');
const userRouter = require('./routers/user');
const favoriteRouter = require('./routers/favorite');
const cors = require('cors');
const avatarsMiddleware = require('adorable-avatars');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/myAvatars', avatarsMiddleware);
app.use(userRouter);
app.use(favoriteRouter);

module.exports = app;
