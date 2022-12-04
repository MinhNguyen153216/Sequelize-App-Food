const jwt = require("jsonwebtoken");

//hàm tạo token
const parseToken = (data) => {
  //có 3 tham số: payload, secret-key, options (algorithm, expireIn)
  //--nếu có header thì payload truyền vào phải là object
  let token = jwt.sign({ data }, "bimat", {
    algorithm: "HS256",
    expiresIn: "10y",
  });
  return token;
};

const checkToken = (token) => {
  try {
    let check = jwt.verify(token, "bimat");
    if (check) {
      return { checkData: true, message: "" };
    }
  } catch (err) {
    return { checkData: false, message: err.message };
  }
};

const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  const verifyToken = checkToken(token);

  //kiểm tra verify sau khi check token
  if (verifyToken.checkData) {
    next();
  } else {
    res.status(401).send(verifyToken.message);
  }
};

module.exports = {
  parseToken,
  checkToken,
  verifyToken,
};
