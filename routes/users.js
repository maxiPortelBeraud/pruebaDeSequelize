const express = require('express');
const { getAllUsers, createUser, updateUser, getAddressUser } = require('../controllers/userController.js');
const router = express.Router();



router.get('/', getAllUsers)

router.get('/:id/address', getAddressUser)
//CREATE /api/users
router.post('/', createUser);

router.put('/:id', updateUser)



module.exports = router;