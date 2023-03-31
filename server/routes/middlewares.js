const jwt = require("jsonwebtoken");
const { isAuthorized } = require("../utils/tokenFunctions");
const { chats } = require("../models/index");

exports.verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다",
    });
  }
  const token = authorization.split(" ")[1];
  try {
    req.decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).send({
        code: 419,
        message: "토큰이 만료되었습니다",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다",
    });
  }
};

exports.verifyChat = async (req, res, next) => {
  const accessTokenData = isAuthorized(req);
  const { id } = accessTokenData;
  const chatId = +req.params.id;

  const chat = await chats.findOne({ where: { id: chatId } });

  if (chat) {
    if (chat.dataValues.user_id !== id) {
      return res
        .status(403)
        .send({ message: "채팅방은 본인만 수정할 수 있습니다." });
    }
    return next();
  }
  return res.status(404).send({ message: "존재하지 않는 채팅방입니다." });
};
