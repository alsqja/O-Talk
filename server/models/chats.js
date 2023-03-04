const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chats.hasMany(models.reviews, {
        foreignKey: 'chat_id',
        onDelete: 'cascade',
      });
      models.chats.belongsTo(models.users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  chats.init(
    {
      contents: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'chats',
    },
  );
  return chats;
};
