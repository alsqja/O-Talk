const { isAuthorized } = require('../../utils/tokenFunctions');
const { chats } = require('../../models/index');

module.exports = {
  post: async (req, res, next) => {
    const { title, contents, isPrivate } = req.body;
    const accessTokenData = isAuthorized(req);
    const { id } = accessTokenData;

    try {
      const newChats = await chats.create({
        contents,
        user_id: id,
        title,
        isPrivate,
      });

      return res.status(201).send({
        data: newChats,
        message: '채팅방이 생성되었습니다.',
      });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  },
  put: async (req, res, next) => {
    const { contents, title } = req.body;
    const chatId = Number(req.params.id);

    try {
      const updated = await chats.update(
        {
          contents,
          title,
        },
        {
          where: { id: chatId },
        },
      );

      return res.status(201).send({
        data: updated,
        message: '채팅방 정보가 수정되었습니다.',
      });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  },
  delete: async (req, res, next) => {
    const id = Number(req.params.id);

    try {
      await chats.destroy({ where: { id } });
      return res.status(204).send({ message: '삭제되었습니다.' });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  },
};
