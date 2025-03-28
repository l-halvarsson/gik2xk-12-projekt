module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'CartRow',
      {
      
        amount: {
          type: DataTypes.DOUBLE,
          allowNull: false
        },
       
      },
      { underscored: true }
    );
  };