const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class warnings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.warnings.belongsToMany(models.users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
      models.warnings.belongsToMany(models.users, {
        foreignKey: 'warned_id',
        onDelete: 'CASCADE',
      });
    }
  }
  warnings.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      warned_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contents: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'warnings',
    },
  );
  return warnings;
};
