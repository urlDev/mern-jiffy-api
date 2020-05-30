const express = require('express');
require('./db/db');
const userRouter = require('./routers/user');
const favoriteRouter = require('./routers/favorite');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(favoriteRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
