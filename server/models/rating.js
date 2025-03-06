module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'rating',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        payed: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      },
      { underscored: true }
    );
  };