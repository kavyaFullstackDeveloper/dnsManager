
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const add =  require("./Routes/add.js");
const edit = require("./Routes/edit.js")
const del = require("./Routes/delete.js");
const fetch = require("./Routes/fetch.js");
const login = require("./Routes/login.js");
const auth = require("./Routes/auth.js");

const app = express();
dotenv.config();

// Middleware

app.use(express.json()); // Body parser when sent as json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', add);
app.use('/', edit);
app.use('/', del);
app.use('/', fetch);
app.use('/', login);
app.use('/', auth);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database is connected successfully');
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

connectDB();

app.get('/', (request, res) => {
  res.send('WORKING FINE');
});