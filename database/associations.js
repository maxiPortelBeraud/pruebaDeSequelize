const Address = require("./models/Address.js");
const Band = require("./models/Band.js");
const Post = require("./models/Post.js");
const User = require("./models/User.js");


//Uno a uno / 1 a 1 
User.hasOne(Address)//Añade una Foreing key a la tabla Address
Address.belongsTo(User)//Agrega FK userId a la tabla address(Ya esta creada arriba acá enlaza)

/* --CON ALIAS y DECLARANDO LA FK-- */
//User.hasOne(Address, {as : "domicilio", foreignKey: 'residente_id'})
//El 'User' tiene un 'Address'(domicilio)  Esta llave representa al User

//Address.belongsTo(User, {as : "residente", foreignKey: 'residente_id'})
//El 'Addres' es de 'User'  (Residente)   Esta llave representa la misma llave de arriba

/* Para esto es necesario llamar
del mismo modo el alias en la query */



//Uno a muchos / 1 a N
//Este usuario va a tener muchos post
User.hasMany(Post); //Se añade una FK(userId) a la tabla "posts"
Post.belongsTo(User);//Se añade una FK(userId) a la tabla "posts"

//User.hasMany(Post, {as: 'publicaciones, foreignKey: 'autorId'});

//Post.belongsTo(User, {as: 'autor'});
//No es necesario declarar FK porque cambiamos el alias por autos, haciendo que cree un id llamado autorId, tal cual como lo llamamos antes


// muchos a muchos / N a N
//El usuario puede perteneceer a varias bandas
// 'through' es una nueva tabla pivot entre usuarios y bandas
User.belongsToMany(Band, { through: 'user_band' });
Band.belongsToMany(User, { through: 'user_band' });

module.exports = {
    Address,
    Band,
    Post,
    User
}