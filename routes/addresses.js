const express = require('express');
const router = express.Router();
const Address = require('../database/models/Address.js');
const User = require('../database/models/User.js')

router.get('/', async (req,res) => {
    try {
        const address = await Address.findAll({
            include: {
                model: User,
                attributes: ['name', 'age']
            },attributes: ['street']
        });
        res.json(address);
    } catch (error) {
        res.json(error);
    }
})

//CREATE /api/users
router.post('/', async (req, res) =>{
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });
        res.json(user)
    } catch (error) {
        res.json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userUpdated = await User.update({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        },
        {
            where: { id : req.params.id}
        });
        res.json(userUpdated)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;