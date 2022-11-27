const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  // findByIdAndUpdate is deprecated thats why we need to add this here
  useFindAndModify: false,
});
