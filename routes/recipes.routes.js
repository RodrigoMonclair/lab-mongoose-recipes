import express from "express";
import RecipeModel from "../models/Recipe.model.js";
import UserModel from "../models/user.model.js";

const recipeRoute = express.Router();

//------------------------------------------------------------------
//ROTAS
recipeRoute.get("/all-recipes", async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find({}).populate("creator");
    return res.status(200).json(allRecipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Consulta não realizada");
  }
});

//1) criando uma receita
recipeRoute.post("/create-recipe/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const newRecipe = await RecipeModel.create({ ...req.body, creator: idUser });

    await UserModel.findByIdAndUpdate(
      idUser,
      {$push: {recipes: newRecipe._id}},
      {new: true, runValidators:true}
    )

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Algo deu errado com a criação da receita" });
  }
});

//2) Criando várias receitas

recipeRoute.post("/create-many", async (req, res) => {
  try {
    const manyRecipes = await RecipeModel.insertMany(req.body);

    return res.status(201).json(manyRecipes);
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: "Não foi possível criar as receitas." });
});

//3) Editando uma receita

recipeRoute.put("/edit-recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateRecipe = await RecipeModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(202).json(updateRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo errado com a edição" });
  }
});

//4) deletando uma receita
recipeRoute.delete("/delete-recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await RecipeModel.findByIdAndDelete(id);

    await UserModel.findByIdAndUpdate(
      deletedRecipe._creator,
      {$pull:{
          recipes: id,
      }
    }, 
    {new: true, runValidators:true}
    )

    return res.status(204).json(deletedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo deu errado" });
  }
});

//------------------------------------------------------------------

export default recipeRoute;
