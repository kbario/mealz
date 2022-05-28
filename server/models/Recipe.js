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
  description: {
    type: String,
    trim: true,
    required: false,
  },
  serves: {
    type: Number,
    required: true,
  },
  ingredients: [ingredientSchema],
  instructions: [String],
  from: {
    type: String,
    required: false,
  },
  cookTime: {
    type: Number,
    required: false,
  },
  cuisine: {
    type: String,
    required: false,
  },
});

recipeSchema.virtual("numberOfIngredients").get(function () {
  return this.ingredients.length;
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
