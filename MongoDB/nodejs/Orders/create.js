const { default: mongoose } = require("mongoose");
const { Order } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

try {
  const data = {
    createdDate: "10/12/2022",
    shippedDate: "20/12/2022",
    status: "COMPLETED",
    description: "40 dcb street",
    shippingAddress: "dcb street",
    paymentType: "CASH",
  };

  const newItem = new Order(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
