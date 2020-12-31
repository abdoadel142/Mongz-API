const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  restaurants: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Menu", menuSchema);
