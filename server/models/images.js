const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.images.belongsTo(models.users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
      models.images.hasOne(models.users, {
        foreignKey: 'profile',
        onDelete: 'cascade',
      });
      models.images.hasOne(models.users, {
        foreignKey: 'basic_profile',
        onDelete: 'cascade',
      });
    }
  }
  images.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      toonificated: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'images',
    },
  );
  return images;
};
