const express = require('express')
const router = express.Router()
const controller = require('./controllers')

router.get('/', controller.getUsers)
router.get('/user/:id', controller.getOneUser)
router.get('/allusers', controller.getAllUsers)
router.post('/user', controller.postUsers)
router.put('/user/:id', controller.updateUser)
router.delete('/user/:id', controller.deleteUser)

module.exports = router