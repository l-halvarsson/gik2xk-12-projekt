module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'rating',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        rating: {
          type: DataTypes.DOUBLE,
          allowNull: false
        },
        product_id: {  //Här lägger vi till FK
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products', //Viktigt: Måste matcha namnet på produkttabellen
            key: 'id'
          },
          onDelete: 'CASCADE' //Om en produkt tas bort, raderas alla dess ratings
        }
      },
      { underscored: true }
    );
  };