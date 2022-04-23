'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    UserID: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true
    },
    Email: {
      type: DataTypes.TEXT,
      unique: true
    },
    Password: {
      type: DataTypes.STRING(1234),
      // protected: true
    },
    UserStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
  	createdAt: 'CreatedOn',
  	updatedAt: 'ModifiedOn',
  	freezeTableName: true
  });

  User.removeAttribute('id');

  User.associate = function(models) {
    // associations can be defined here
    
    User.hasOne(models.user_details,{
      foreignKey: 'UserID',
      // as: 'userID'
    }); 

  };
  return User;
};