const { default: mongoose } = require("mongoose");

const { Product } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/thucntd");

var express = require("express");
const { query } = require("express");
var router = express.Router();

// GET
router.get("/", function (req, res, next) {
  try {
    Product.find()
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// GET:id
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Product.findById(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// POST
router.post("/", function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Product(data);
    newItem
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// PATCH/:id
router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    Product.findByIdAndUpdate(id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.sendStatus(500);
  }
});

// DELETE
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Product.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 1
// ------------------------------------------------------------------------------------------------
router.get("/question/1", function (req, res, next) {
  try {
    let query = { discount: { $gte: 15 } };
    Product.find(query)
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 4
// ------------------------------------------------------------------------------------------------
// router.get("/questions/4", function (req, res) {
//   const text = "Thanh Khe";
//   const query = { address: new RegExp(`${text}`) };

//   findDocuments({ query }, "products")
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// });

// // ------------------------------------------------------------------------------------------------
// // QUESTIONS 5
// // ------------------------------------------------------------------------------------------------
// router.get("/questions/5", function (req, res) {
//   const query = {
//     $expr: {
//       $eq: [{ $year: "$birthday" }, 1990],
//     },
//   };

//   findDocuments({ query }, "products")
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// });

// // ------------------------------------------------------------------------------------------------
// // QUESTIONS 6
// // ------------------------------------------------------------------------------------------------
// router.get("/questions/6", function (req, res) {
//   const today = new Date();
//   const eqDay = { $eq: [{ $dayOfMonth: "$birthday" }, { $dayOfMonth: today }] };
//   const eqMonth = { $eq: [{ $month: "$birthday" }, { $month: today }] };

//   const query = {
//     $expr: {
//       $and: [eqDay, eqMonth],
//     },
//   };

//   findDocuments({ query }, "products")
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// });
module.exports = router;
