const { chats } = require('../../models/index');

module.exports = {
  findChat: async (userId, chatId) => {
    const chat = await chats.findOne({ where: { id: chatId } });

    if (chat) {
      if (chat.dataValues.user_id !== userId) {
        return '채팅방은 본인만 수정할 수 있습니다.';
      }
      return chat;
    }
    return '존재하지 않는 채팅방입니다.';
  },
};
