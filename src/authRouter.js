const Router = require('express')
const router = new Router()
const controller = require('./authControllers')
const {check} = require('express-validator')
const authMiddleware = require('./middlewaree/authMidleware')
const roleMiddleware = require('./middlewaree/roleMiddleware')

router.post('/sign-up',[
    check('username','The name can`t be empty').notEmpty(),
    check('password', 'Password can`t be from 4 to 10 symbols').isLength({min: 4, max:10})
], controller.registration)
router.post('/sign-in', controller.login)
router.get('/users',  roleMiddleware(['admin']), controller.getUsers)

module.exports = router
