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
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
