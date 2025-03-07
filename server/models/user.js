module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      'User',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING(200),
          allowNull: false,
          validate: {
            len: [4, 200],
            isEmail: true
          }
        },
        /*
        Lägg till om vi vill senare :)
        password: {
          type: DataTypes.STRING(200),
          allowNull: false,
          validate: {
            len: [8, 50],
          }
        },*/ 
        firstName: DataTypes.STRING(50),
        lastName: DataTypes.STRING(50),
        description: DataTypes.TEXT,
      },
      { underscored: true }
    );
  };