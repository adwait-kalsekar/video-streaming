import dotenv from "dotenv";

import connectDB from "./db/index.js";
import app from "./app.js";
import { PORT } from "./constants.js";

// Experimental Feature
dotenv.config({ path: "./.env" });

// DataBase and Server Connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error(`Could not Connect to MongoDB! \n${err}`);
  });
