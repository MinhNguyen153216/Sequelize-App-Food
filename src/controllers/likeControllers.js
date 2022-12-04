const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require("../config/reponse");

//Create Like
const createLike = async (req, res) => {
  try {
    let { user_id, res_id, date_like } = req.body;
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
    let checkLike = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });
    if (checkLike) {
      failCode(res, checkLike, "User đã like nhà hàng trước đó");
    } else if (!checkUser || !checkRes) {
      failCode(res, "User hoặc Restaurant không tồn tại");
    } else {
      let result = await model.like_res.create({
        user_id,
        res_id,
        date_like,
      });
      sucessCode(res, result, "User like nhà hàng thành công");
    }
  } catch (err) {
    errorCode(res, err, "Lỗi backend");
  }
};

//Delete like (unlike)
const unlike = async (req, res) => {
  try {
    let { user_id, res_id } = req.body;
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
    let checkLike = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });
    if (!checkUser || !checkRes) {
      failCode(res, "User hoặc Restaurant không tồn tại");
    } else if (!checkLike) {
      failCode(res, "User chưa like Restaurant này");
    } else {
      let result = await model.like_res.destroy({
        where: {
          user_id,
          res_id,
        },
      });
      sucessCode(res, result, "User unlike thành công");
    }
  } catch (err) {
    errorCode(res, "Lỗi backend");
  }
};

//Get LikeByUser
const getLikeByUser = async (req, res) => {
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
      let result = await model.like_res.findAll({
        where: {
          user_id,
        },
      });
      sucessCode(res, result, "Lấy danh sách like từ User thành công");
    }
  } catch (err) {
    errorCode(res, "Lỗi backend");
  }
};

//Get LikeByRes
const getLikeByRes = async (req, res) => {
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
      let result = await model.like_res.findAll({
        where: {
          res_id,
        },
      });
      sucessCode(res, result, "Lấy danh sách like từ Restaurant thành công");
    }
  } catch (err) {
    errorCode(res, "Lỗi backend");
  }
};

module.exports = {
  createLike,
  unlike,
  getLikeByUser,
  getLikeByRes,
};
