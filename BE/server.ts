import mongoose from "mongoose";
import app from "./app";
import { env } from "./utility/envParser";


const mongourl = env.MONGO_URL;

mongoose.connect(env.MONGO_URL);

app.listen(env.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${env.PORT}`);
  });