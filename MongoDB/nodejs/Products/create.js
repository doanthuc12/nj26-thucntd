const { default: mongoose } = require("mongoose");
const { Product } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    name: "SSD",
    price: 450,
    discount: 70,
    stock: 15,
  };

  const newItem = new Product(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
