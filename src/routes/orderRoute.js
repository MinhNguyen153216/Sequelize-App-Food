const express = require("express");
const orderRoute = express.Router();
const { createOrder, getOrder } = require("../controllers/orderController");

//GET order
orderRoute.get("/getOrder", getOrder);

//POST create order
orderRoute.post("/createOrder", createOrder);

//--export
module.exports = orderRoute;
