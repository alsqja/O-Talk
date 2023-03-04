const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class marks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.marks.belongsTo(models.users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
      models.marks.belongsTo(models.users, {
        foreignKey: 'marked_id',
        onDelete: 'CASCADE',
      });
    }
  }
  marks.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      marked_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'marks',
    },
  );
  return marks;
};
