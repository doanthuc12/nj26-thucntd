const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html

// Validator
// https://mongoosejs.com/docs/validation.html#built-in-validators

const productSchema = Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, min: 0, max: 75, default: 0 },
    stock: { type: Number, min: 0, default: 0 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

const Product = model("Product", productSchema);
module.exports = Product;
