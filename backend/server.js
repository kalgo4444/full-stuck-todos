const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRouter = require('./src/models/todo.router');

dotenv.config();
const DB_URL = process.env.DB_URL;
const PORT = parseInt(process.env.PORT || '8080', 10);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/v1/api/todo', todoRouter);

const boost = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
  } catch (error) {
    console.error('Startup error:', error);
  }
};

boost();
