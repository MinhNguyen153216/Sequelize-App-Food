const express = require("express");
const rootRoute = express.Router();
//
const userRoute = require("./userRoute");
const foodRoute = require("./foodRoute");
const orderRoute = require("./orderRoute");
const likeRoute = require("./likeRoute");
const rateRoute = require("./rateRoute");
//
rootRoute.use("/user", userRoute);
rootRoute.use("/food", foodRoute);
rootRoute.use("/order", orderRoute);
rootRoute.use("/like", likeRoute);
rootRoute.use("/rate", rateRoute);

module.exports = rootRoute;

//localhost:8080/api/user/getUser
