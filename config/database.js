const mongoose = require('mongoose');
// const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true}, 
  console.log(`Connected to db!`));

  mongoose.set('useFindAndModify', false);

// mongoose.connection.on('connected', function () {
//     console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
// });
