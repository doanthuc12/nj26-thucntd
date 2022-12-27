const { default: mongoose } = require("mongoose");

const { Supplier } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  Supplier.find().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
