const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require("../config/reponse");
const { parseToken } = require("../middlewares/baseToken");

//getOrder
const getOrder = async (req, res) => {
  try {
    let data = await model.order.findAll();
    sucessCode(res, data, "Lấy dữ liệu thành công");
  } catch (err) {
    errorCode(res, "Lỗi backend");
  }
};

//createOrder
const createOrder = async (req, res) => {
  try {
    let { user_id, food_id, amount, code, arr_sub_id } = req.body;
    let checkUser = await model.user.findOne({
      where: {
        user_id,
      },
    });
    let checkFood = await model.food.findOne({
      where: {
        food_id,
      },
    });
    let checkOrder = await model.order.findOne({
      where: {
        user_id,
        food_id,
      },
    });
    if (!checkUser || !checkFood) {
      failCode(res, { user_id }, "User hoặc Food không tồn tại");
    } else if (checkOrder) {
      failCode(res, checkOrder, "Order từ User đến Food đã tồn tại");
    } else {
      let result = await model.order.create({
        user_id,
        food_id,
        amount,
        code,
        arr_sub_id,
      });
      sucessCode(res, result, "Tạo mới thành công");
    }
  } catch (err) {
    errorCode(res, err);
  }
};

module.exports = {
  getOrder,
  createOrder,
};
