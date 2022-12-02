import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    level: {
      type: String,
      enum: ["easy peasy","amateur chef","ultrapro chef"],
      lowercase: true
    },

    ingredients: [{type: String}],
    cuisine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      enum: ["brakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    
   created: {
    type: Date,
    default: Date.now
   }
  }
  
);

const RecipeModel = model("Recipe", recipeSchema);

export default RecipeModel;
