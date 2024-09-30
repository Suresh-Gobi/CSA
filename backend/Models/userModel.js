const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); 

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
  }, {
    timestamps: true,
  });

  return User;
};
