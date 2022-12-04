const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require("../config/reponse");

//GET rate by User
const getRateByUser = async (req, res) => {
  try {
    let { user_id } = req.body;
    let checkUser = await model.user.findOne({
      where: {
        user_id,
      },
    });
    if (!checkUser) {
      failCode(res, "User không tồn tại");
    } else {
      let result = await model.rate_res.findAll({
        where: {
          user_id,
        },
      });
      sucessCode(res, result, "Lấy danh sách đánh giá của User thành công");
    }
  } catch (err) {
    errorCode(res, "Lỗi backend");
  }
};

//GET rate by Restaurant
const getRateByRes = async (req, res) => {
  try {
    let { res_id } = req.body;
    let checkRes = await model.restaurant.findOne({
      where: {
        res_id,
      },
    });
    if (!checkRes) {
      failCode(res, "Restaurant không tồn tại");
    } else {
      let result = await model.rate_res.findAll({
        where: {
          res_id,
        },
      });
      sucessCode(
        res,
        result,
        "Lấy danh sách đánh giá của Restaurant thành công"
      );
    }
  } catch (err) {
    errorCode(res, "Lỗi backend");
  }
};

//POST rate
const postRate = async (req, res) => {
  try {
    let { user_id, res_id, amount, date_rate } = req.body;
    let checkUser = await model.user.findOne({
      where: {
        user_id,
      },
    });
    let checkRes = await model.restaurant.findOne({
      where: {
        res_id,
      },
    });
    let checkRate = await model.rate_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    if (!checkUser || !checkRes) {
      failCode(res, "User hoặc Restaurant không tồn tại");
    } else if (checkRate) {
      failCode(res, checkRate, "User đã đánh giá nhà hàng trước đó");
    } else {
      let result = await model.rate_res.create({
        user_id,
        res_id,
        amount,
        date_rate,
      });
      sucessCode(res, result, "User đánh giá thành công");
    }
  } catch (err) {
    errorCode(res,err, "Lỗi backend");
  }
};

module.exports = {
  getRateByUser,
  getRateByRes,
  postRate
};
