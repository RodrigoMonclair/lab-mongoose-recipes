import express from "express";
import UserModel from "../models/user.model.js";

const userRoute = express.Router();

userRoute.post("/create-user", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    return res.status(201). json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

export default userRoute;
