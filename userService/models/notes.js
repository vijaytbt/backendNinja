'use strict';
module.exports = (sequelize, DataTypes) => {
  const notes
  = sequelize.define('notes', {
    NotesID: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserDetailsID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT
    },
    Filepath: {
      type: DataTypes.TEXT
    },
    Version: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    createdAt: 'CreatedOn',
    updatedAt: 'ModifiedOn',
  	freezeTableName: true
  });

  notes.removeAttribute('id');

  notes.associate = function(models) {
  // associations can be defined here
  
  };
  return notes;
};