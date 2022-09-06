const { Model, DataTypes} = require('sequelize');
const sequelize = require('../db.js')

class Address extends Model {}
Address.init({
    street: DataTypes.STRING,
},{
    sequelize,
    modelName: 'address',
    //timestamps: false
});

module.exports = Address