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
        /*user_id: {  //Här lägger vi till FK
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users', //Viktigt: Måste matcha namnet på produkttabellen
            key: 'id'
          },
          onDelete: 'CASCADE' //Om en produkt tas bort, raderas alla dess ratings
        }*/
      },
      { underscored: true }
    );
  };