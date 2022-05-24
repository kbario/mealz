const { Schema, model, SchemaTypes } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  serves: {
    type: Number,
    required: true,
  },
  ingredients: [ingredientSchema],
  from: {
    type: String,
  },
  cookTime: {
    type: Number,
  },
  cuisine: {
    type: String,
  },
});

recipeSchema.virtual("numberOfIngredients").get(function () {
  return this.ingredients.length;
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
