import express from "express";
import UserModel from "../models/user.model.js";

const userRoute = express.Router();

userRoute.post("/create-user", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

userRoute.get("/all-users", async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

userRoute.get("/oneUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate("recipes");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

userRoute.put("/edit-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userUpdate = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

export default userRoute;
