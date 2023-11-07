import { app } from './app';
import config from './src/common/config';
import { envVars } from './src/common/constants';
const cloudinary = require('cloudinary');

import connectDatabase from './src/common/dbConnect';

const port: number = config.app.port;
// Mongodb setup
const start = async () => {
  envVars.forEach(
    (each) => !process.env[each] && console.log(each, 'is not defined')
  );

  try {
    connectDatabase();
  } catch (err) {
    throw new Error('error connecting to database');
  }
};

start();

//Set up cloudinary.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});
