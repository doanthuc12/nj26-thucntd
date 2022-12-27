const { default: mongoose } = require("mongoose");
const { Supplier } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    name: "Xiaomi",
    email: "xiaomi@gmail.com",
    address: "3 ABC Street, America",
  };

  const newItem = new Supplier(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
