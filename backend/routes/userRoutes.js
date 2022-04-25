const express = require('express');
const router = express.Router()
const { registerUser, loginUser, getUser, getUsers, deleteUser, logoutUser } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.delete('/logout', logoutUser)
router.get('/:id', getUser)
router.get('/', getUsers)
router.delete('/:id', deleteUser)

module.exports = router