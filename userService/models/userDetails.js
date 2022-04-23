'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define('user_details', {
    UserDetailsID: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true
    },
    UserID: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING,
      // allowNull: true
    },
    Address: {
      type: DataTypes.TEXT,
      defaultValue: 0
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

  UserDetails.removeAttribute('id');

  UserDetails.associate = function(models) {
    // associations can be defined here
    UserDetails.belongsTo(models.user,{
    	foreignkey: 'UserID',
    	onDelete: 'CASCADE',
    });

  };
  return UserDetails;
};