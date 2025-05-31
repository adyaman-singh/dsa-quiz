import app from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  if (!process.env.ENV) {
    console.log("no ENV file present");
    process.exit(1);
  }

  await connectDB();

  app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`);
  });
})();
