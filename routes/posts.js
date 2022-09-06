const express = require('express');
const { getAllPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/postController');
const router = express.Router();


router.get('/', getAllPosts);

//CREATE
router.post('/', createPost);

//GET 1
router.get('/:id', getPost);
//UPDATE
router.put('/:id', updatePost);

//DELETE
router.delete('/:id', deletePost);


module.exports = router;