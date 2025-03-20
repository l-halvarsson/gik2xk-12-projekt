module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Product',
    {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [2, 100]
        }
      },
      description: DataTypes.TEXT,
      imageUrl: {
        type: DataTypes.STRING(255)//,
        /*validate: {
          isUrl: true
        }*/
      },
      price: {
        type: DataTypes.DOUBLE(10,2),
        allowNull: false,
      },
    },
    { underscored: true }
  );
};

