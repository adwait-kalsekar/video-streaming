import dotenv from "dotenv";

import connectDB from "./db/index.js";

// Experimental Feature
dotenv.config({ path: "./.env" });

connectDB();
