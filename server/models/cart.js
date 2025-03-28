module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'Cart',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        payed: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        
      },
      { underscored: true }
    );
  };