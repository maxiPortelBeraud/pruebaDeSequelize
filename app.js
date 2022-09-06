const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('./database/db.js');
const User = require('./database/models/User.js');
require('./database/associations.js')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', /* async */ (req, res) => {
    /* try {
        const user = User.create({
            name: "Maxi",
            birthday: new Date(1999, 4 ,6)
        });
        res.json(user)
    } catch (error) {
        console.log(error);
    } */
/*     try {
        const user = await User.findAll()
        console.log(user);
        res.json(user)
    } catch (error) {
        console.log(error);
    } */
    res.json('Hola mundo')
})

app.use('/api/posts', require('./routes/posts.js'));
app.use('/api/users', require('./routes/users.js'));
app.use('/api/addresses', require('./routes/addresses.js'))

app.listen(PORT, () => {
    console.log(`Servidor a la escucha en http://localhost:${PORT}`);

    //
    try {
        //Force true = DROP TABLES
        //Force false = no cambia las bases de datos
        sequelize.sync({force: false});
        sequelize.authenticate()
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
    }
});