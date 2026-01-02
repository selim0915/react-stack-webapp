require('dotenv').config();
const mongoose = require('mongoose');

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
} = process.env;

const URL =
  DB_USER && DB_PASS
    ? `mongodb+srv://${DB_USER}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}?appName=cluster`
    : '';

mongoose
  .connect(URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB disconnect: initial connection failed');
    console.error(err.message);
  });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB disconnect: background error');
  console.error(err.message);
});

module.exports = mongoose.connection;
