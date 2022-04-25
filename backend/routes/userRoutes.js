const express = require('express');
const router = express.Router()
const { registerUser, loginUser, getUser, getUsers, deleteUser, logoutUser } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.delete('/logout', logoutUser)
router.get('/:username', getUser)
router.get('/', getUsers)
router.delete('/:username', deleteUser)

module.exports = router