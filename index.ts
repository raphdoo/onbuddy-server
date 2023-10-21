import { app } from "./app";
import config from "./src/common/config";
import { envVars } from "./src/common/constants";

import connectDatabase from "./src/common/dbConnect";

const port: number = config.app.port;
// Mongodb setup
const start = async () => {
  envVars.forEach((each) => console.log(process.env[each]));

  connectDatabase();
};

app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});

start();
