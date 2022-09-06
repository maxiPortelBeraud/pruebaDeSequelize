const express = require('express');
const Address = require('../database/models/Address.js');
const Post = require('../database/models/Post.js');
const User = require('../database/models/User.js');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [  //Armamos un array porque vamos a utilizar 2 objetos que representan a 2 tablas distintas
                {
                    model: Address, //Tabla Address
                    attributes: ['street']  //atributos que mostramos de la tabla Address
                },

                {
                    model: Post, //Tabla Post
                    attributes: ['title', 'body'] //atributos que mostramos de la tabla Post
                }
            ],
            attributes: ['name', 'age'] //atributos que mostramos de la tabla User
        });
        res.json(users)
    } catch (error) {
        res.json(error)
    }
}


const createUser = async (req, res) => {
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
}

const updateUser = async (req, res) => {
    try {
        const userUpdated = await User.update({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        },
            {
                where: { id: req.params.id }
            });
        res.json(userUpdated)
    } catch (error) {
        res.json(error)
    }
}

const getAddressUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.id},
        });
        /* El metodo 'getAddress()'  sirve para buscar de forma sencilla 
        los datos de otra tabla que esté relacionada, usando getNombreDelatabla() */
        let getAddress = await user.getAddress({
            attributes: ['street']
        })
        res.json(getAddress)
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    getAddressUser,
    getAllUsers,
    createUser,
    updateUser
}