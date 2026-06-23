const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    description: String,
    stock: { type: Number, default: 0 },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    features: [String],
    colors: [String],

    images: [
      {
        url: String,
        filename: String,
        order: Number,
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);