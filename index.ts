import { app } from './app';
import config from './src/common/config';
import { envVars } from './src/common/constants';

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

app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});

start();
