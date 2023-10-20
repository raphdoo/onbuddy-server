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
  if (!process.env.SMTP_HOST) {
    throw new Error('SMTP_HOST must be defined');
  }
  if (!process.env.SMTP_PORT) {
    throw new Error('SMTP_PORT must be defined');
  }
  if (!process.env.SMTP_EMAIL) {
    throw new Error('SMTP_EMAIL must be defined');
  }
  if (!process.env.SMTP_PASSWORD) {
    throw new Error('SMTP_PASSWORD must be defined');
  }
  if (!process.env.SMTP_FROM_NAME) {
    throw new Error('SMTP_FROM_NAME must be defined');
  }
  if (!process.env.SMTP_FROM_EMAIL) {
    throw new Error('SMTP_FROM_EMAIL must be defined');
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
