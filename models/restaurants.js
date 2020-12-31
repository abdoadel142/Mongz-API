const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: [
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  menuId: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
    // required: true,
  },
  rate: {
    type: Number,
  },
});

module.exports = mongoose.model("Restaurants", restaurantsSchema);
