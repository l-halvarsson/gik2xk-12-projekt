'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Definiera relationer

// En användare kan ha flera produkter i en kundvagn
db.User.hasMany(db.Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.Cart.belongsTo(db.User, { foreignKey: 'user_id' });

// En produkt kan ha flera betyg
db.Product.hasMany(db.Rating, { foreignKey: 'product_id', onDelete: 'CASCADE' });
db.Rating.belongsTo(db.Product, { foreignKey: 'product_id' });

// En kundvagn (Cart) kan ha flera produkter via CartRow
db.Cart.belongsToMany(db.Product, { through: db.CartRow, foreignKey: 'cart_id' });
db.Product.belongsToMany(db.Cart, { through: db.CartRow, foreignKey: 'product_id' });

// CartRow hör till både Cart och Product
db.CartRow.belongsTo(db.Cart, { foreignKey: 'cart_id' });
db.CartRow.belongsTo(db.Product, { foreignKey: 'product_id' }); 


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
