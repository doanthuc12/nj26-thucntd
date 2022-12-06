var express = require("express");
var router = express.Router();

const categories = require("../data/categories.json");
/* GET*/
router.get("/", function (req, res, next) {
  // res.send(categories.map?.id);
  res.send(categories);
});

router.post("/", function (req, res, next) {
  const data = { message: "First post" };
  res.send(data);
});
module.exports = router;
