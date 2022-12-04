const express = require("express");
const likeRoute = express.Router();
const {
  createLike,
  unlike,
  getLikeByUser,
  getLikeByRes,
} = require("../controllers/likeControllers");

//Create Like
likeRoute.post("/createLike", createLike);

//unlike
likeRoute.delete("/unlike", unlike);

//get like by user
likeRoute.get("/getLikeByUser", getLikeByUser);

//get like by res
likeRoute.get("/getLikeByRes", getLikeByRes);

//exports
module.exports = likeRoute;
