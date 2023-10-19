import mongoose from 'mongoose';
import { app } from './app';

import dotenv from 'dotenv';

dotenv.config();

// Mongodb setup
const start = async () => {
  //check enviroment variables are set
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/onbuddy');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.log('err');
  }
};

app.listen(3000, () => {
  console.log('Listening on port number 3000');
});

start();
