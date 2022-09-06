const express = require('express');
const Address = require('../database/models/Address');
const Post = require('../database/models/Post');
const User = require('../database/models/User');

const getAllPosts = async (req, res) =>{
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['name', 'age']
            },attributes: ['title', 'body']
        });
        res.json(posts)
    } catch (error) {
        res.json({messenge: messenge.error})
    }
};

const getPost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        res.json(post)
    } catch (error) {
        res.json(error)
    }
};


const createPost = async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            body: req.body.body
        });
        res.json(post)
    } catch (error) {
        console.log(error);
    }
};

const updatePost =  async (req, res) => {
    try {
        await Post.update({
            title: req.body.title,
            body: req.body.body
        },{
            where:{
                id: req.params.id
            }
        });
        res.json({messenge: 'Actualizado correctamente'})
    } catch (error) {
        
    }
};

const deletePost =  async (req, res) => {
    try {
        await Post.destroy({
            where:{
                id: req.params.id
            }
        });
        res.json({messenge: 'Borrado correctamente'})
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getPost,
    updatePost
}