const sequelize = require('./database/db.js');
const { Post, Band, Address, User } = require('./database/associations.js');
/* const User = require('./database/models/User.js');
const Post = require('./database/models/Post.js');
const Address = require('./database/models/Address.js');
const Band = require('./database/models/Band.js'); */

//require('./database/associations.js');

//Usuarios
const coso = [
    { name: 'Maxi', email: 'navixam@email.com', age: 30, role: 0 },
    { name: 'Pepe', email: 'pepe@email.com', age: 25, role: 1 },
    { name: 'Lucia', email: 'lucia@email.com', age: 20, role: 0 }
];

//direciones
const addresses = [
    { street: 'Calle falsa 123', userId: 1 },
    { street: 'Bajo un puente', userId: 2 },
    { street: 'La isla bonita 456', userId: 3 }
];

//posts
const posts = [
    { title: 'post', body: 'Buenas', userId: 1 },
    { title: 'post', body: 'Buenas tardes', userId: 1 },
    { title: 'title', body: 'Buenas noches', userId: 1 },
    { title: 'title', body: 'Buenos dias', userId: 1 },
    { title: 'post', body: 'Chau', userId: 2 },
    { title: 'post', body: 'Hasta luego', userId: 2 },
    { title: 'title', body: 'Que paso?', userId: 3 },
];


/* const añadir1 = async() =>{
    try {
        sequelize.sync({ force: false });
        console.log('Conexion establecida2');
        users.forEach(async (user) => await User.create(user));
    } catch (error) {
        console.log(error);
    }
} */

const añadir = async () => {
    try {
        sequelize.sync({ force: false });
        console.log('Conexion establecida'); //Descomentar uno por uno para que ande. Buscar error porque no anda todo junto (Creo que es necesario poner el await, solo que no se donde)
        coso.forEach((user) => User.create(user));
        addresses.forEach((address) => Address.create(address));
        posts.forEach((post) => Post.create(post));
        let band1 = await Band.create({ //Creamos banda 1
            name: 'Pantera',
            type: 'Groove Metal',
            users: [
                { name: 'Joaquina', email: 'joaquina@email.com', age: 20 },
                { name: 'Alberto', email: 'berto@email.com', age: 30, role: 0 }
            ]
        }, {
            include: 'users'
        })
        let user1 = await User.create({ name: 'Raul', email: 'raul@email.com', age: 27, role: 0 }); //Creamos usuario1 
        let user2 = await User.create({ name: 'Graciela', email: 'grace@email.com', age: 31, role: 0 }); //Creamos usuario2
        let band2 = await Band.create({ //Creamos banda 2
            name: 'Death',
            type: 'Death Metal'
        });
        band2.addUsers([user1, user2]); //añadimos a esta banda las variables con la informacion de los usuarios

        let user3 = await User.create({ name: 'Sofia', email: 'so@email.com', age: 21, role: 0 });
        user3.setBands([band1, band2]);
    } catch (error) {
        console.log(error);
    }
}
//añadir1();
añadir();


//Forma con then(qe tampoco funciona de forma optima)
/* sequelize.sync({ force: false }).then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
}).then(() => {
    // Rellenar usuarios
    users.forEach(user => User.create(user));
    console.log("Users");
}).then(() => {
    // Rellenar direcciones
    addresses.forEach(address => Address.create(address));
    console.log("Adress");
}).then(() => {
    // Rellenar posts
    posts.forEach(post => Post.create(post));
}); */