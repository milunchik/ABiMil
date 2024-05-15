const Router = require('express')
const router = new Router()
const controller = require('./authControllers')
const {check} = require('express-validator')
const authMiddleware = require('./middlewaree/authMidleware')
const roleMiddleware = require('./middlewaree/roleMiddleware')

router.get('/allusers', controller.getUsers)
router.post('/sign-in', controller.login)
router.post('/sign-up',[
    check('username','The name can`t be empty').notEmpty(),
    check('password', 'Password have to be from 4 to 10 symbols').isLength({min: 4, max:10})
], controller.registration)
router.get('/admin', authMiddleware, controller.adminAuth)
router.get('/basic', authMiddleware, controller.userAuth)
router.put('/update/:id', controller.update)
router.delete('/delete/:id', controller.delete)

module.exports = router