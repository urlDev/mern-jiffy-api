const express = require('express');
const userRouter = require('./routers/user');
const favoriteRouter = require('./routers/favorite');
const avatarsMiddleware = require('adorable-avatars');
const cors = require('cors');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/myAvatars', avatarsMiddleware);
app.use(userRouter);
app.use(favoriteRouter);

module.exports = app;
