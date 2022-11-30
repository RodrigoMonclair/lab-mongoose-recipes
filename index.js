import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import recipeRoute from "./routes/recipes.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

connect();

app.use("/recipe", recipeRoute);

app.listen(process.env.PORT, () => {
  console.log(`run on port http://localhost:${process.env.PORT}`);
});
