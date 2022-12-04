const express = require("express");
const rateRoute = express.Router();
const {
  getRateByUser,
  getRateByRes,
  postRate,
} = require("../controllers/rateController");

//GET rate by User
rateRoute.get("/rateByUser", getRateByUser);

//GET rate by Res
rateRoute.get("/rateByRes", getRateByRes);

//POST rate
rateRoute.post("/postRate", postRate);

//exports
module.exports = rateRoute;
