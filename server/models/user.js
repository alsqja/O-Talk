const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(models.chats, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        hooks: true,
      });
      models.users.hasMany(models.images, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        hooks: true,
      });
      models.users.hasMany(models.reviews, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        hooks: true,
      });
      models.users.hasMany(models.warnings, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        hooks: true,
      });
      models.users.hasMany(models.warnings, {
        foreignKey: 'warned_id',
        onDelete: 'cascade',
        hooks: true,
      });
      models.users.belongsToMany(models.users, {
        through: 'marks',
        foreignKey: 'user_id',
        as: 'followers',
      });
      models.users.belongsToMany(models.users, {
        through: 'marks',
        foreignKey: 'following_id',
        as: 'followings',
      });
      models.users.belongsTo(models.images, {
        foreignKey: 'profile',
        onDelete: 'cascade',
        hooks: true,
      });
      models.users.belongsTo(models.images, {
        foreignKey: 'basic_profile',
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      basic_profile: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      online: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'users',
    },
  );
  return users;
};
