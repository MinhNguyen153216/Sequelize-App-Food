//tạo ra các API trong các đối tượng Route

//GET POST PUT DELETE
const express = require("express");
const userRoute = express.Router();
const {
  getUser,
  createUser,
  updateUser,
  uploadUser,
  signup,
  login,
} = require("../controllers/userController");

const { upload } = require("../middlewares/upload");
const { verifyToken } = require("../middlewares/baseToken");

//POST Base64
userRoute.post("/upload_base", upload.single("dataUpload"), uploadUser);

//POST upload
//sau khi middle-ware (tham số thứ 2) chạy xong thì nó sẽ chạy vào đường dẫn lưu file đã đc upload
userRoute.post("/upload", upload.single("dataUpload"), (req, res) => {
  console.log(req.file);
});

//GET user
userRoute.get("/getUser", verifyToken, getUser);

//POST create user
userRoute.post("/createUser", createUser);

//PUT update user
userRoute.put("/updateUser/:user_id", updateUser);

//SignUp
userRoute.post("/signup", signup);

//SignUp
userRoute.get("/login", login);

//export
module.exports = userRoute;
