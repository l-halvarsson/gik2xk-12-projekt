module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'CartRow',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        amount: {
          type: DataTypes.DOUBLE,
          allowNull: false
        },
        product_id: { //FK till products
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'products', //Måste matcha exakt tabellnamn
              key: 'id'
            },
            onDelete: 'CASCADE'
          },
          /*cart_id: { //FK till carts
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'carts', //Måste matcha exakt tabellnamn
              key: 'id'
            },
            onDelete: 'CASCADE'
          }*/
      },
      { underscored: true }
    );
  };