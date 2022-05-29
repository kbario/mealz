const { Schema, model, SchemaTypes } = require("mongoose");

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    serving: [{ type: Number, required: true }],
    meals: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Card = model("Card", cardSchema);

module.exports = Card;
