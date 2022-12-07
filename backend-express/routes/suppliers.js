var express = require("express");
var router = express.Router();
var fs = require("fs");

const suppliers = require("../data/suppliers.json");
const fileName = "./data/suppliers.json";

/* GET*/
router.get("/:id", function (req, res, next) {
  res.send(suppliers);
});

/* POST*/
router.post("/", function (req, res, next) {
  const data = req.body;
  console.log(data);
  suppliers.push(data);

  fs.writeFileSync(fileName, JSON.stringify(suppliers), function (err) {
    if (err) {
      throw err;
    }
  });
  res.status(201).json({ message: "Create suppliers successful!" });
});
module.exports = router;
