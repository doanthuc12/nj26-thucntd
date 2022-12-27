const { default: mongoose } = require("mongoose");

const { Product } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  Product.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}