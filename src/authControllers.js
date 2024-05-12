const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./config.js')

const generateAccessToken = (id, roles)=>{
    const payload={
        id,
        roles
    }

    return jwt.sign(payload, secret, {expiresIn: '24h'}) 
}
class authController{
    async registration(req, res){
        try{
                const errors = validationResult(req)
                if(!errors.isEmpty()){
                    return res.status(400).json({message: "Error during registration", errors})
                }
                    const {username, password} = req.body
                    const candidate = await User.findOne({username})

                if(candidate){
                    return res.status(400).json({message: 'The name is already taken'}) 
                }
                    const hashPassword = bcrypt.hashSync(password, 7);

                    const userRole = await Role.findOne({value: 'user'})
                    const user = new User ({username, password: hashPassword, roles:[userRole.value]})
                    await user.save()
                
                return res.json({message: 'User registered'})
            }catch(error){
                console.log(error)
                res.status(400).json({message: 'Registration error'})
            }
    }

    async login(req, res){
        try{
                const {username, password} = req.body

                if(username && password){
                
                        const user = await User.findOne({username})
                        if(!user){
                            return res.status(400).json({message: `User: ${username} is not found`})
                        }

                        const validPassword = bcrypt.compareSync(password, user.password) 
                        if(!validPassword){
                            return res.sat
                        }

                        const token = generateAccessToken(user._id, user.roles)
                        return res.json({token})
                }else{
                    return res.status(400).json({
                        message: 'Username or Password not present'})
                }
            }catch(error){
                console.log(error) 
            }
    }

    adminAuth = (req, res, next) => {
        const token = req.cookies.jwt
        if (token) {
            jwt.verify(token, secret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ message: 'Not authorized' })
                } else {
                    if (decodedToken.role !== 'admin') {
                        return res.status(401).json({ message: 'Not authorized' })
                    } else {
                        next()
                    }
                }
            });
        } else {
            return res.status(401).json({ message: 'Not authorized, token not available' })
        }
    }

    async userAuth(req, res){
        const token = req.cookies.jwt
        if(token){
            jwt.verify(token, secret, (err, decodedToken)=>{
                if(err){
                        return res.status(400).json({message: 'Not authorized'})
                    }else{
                        if(decodedToken.role !='Basic'){
                            return res.status(401).json({message: 'Not authorized'})
                        }else{
                            next()
                        }
                    }
            })
        }else{
            return res.status(401).json({message: 'Not authorized, token not available'})
        }
    }

    async update(req, res){
        try{
            const {role, id} = req.body

            if(role && id){
                if(role === 'admin'){
                    const user = await User.findById(id)
                    if (!user) {
                        return res.status(404).json({message: 'User not found'})
                    }
                    if (user.roles.includes('admin')) {
                        return res.status(400).json({message: 'User is already an admin'})
                    }
                    user.roles.push('admin')
                    await user.save()
                    res.status(201).json({message: 'User role updated successfully', user})
                } else {
                    res.status(400).json({message: 'Role must be "admin"'})
                }
            } else {
               res.status(400).json({message: 'Role or Id not present'})
            }
        }catch(error){
            console.log({message: error})
        }
    }

    async delete(req, res){
        try{
            const {id} = req.body
            const user = await User.findById(id)

            if(!user){
                return res.status(400).json({message: 'User not found'})
            }
            await User.findByIdAndDelete({_id: id})
            res.status(200).json({message: 'Delete successfully'})
        }catch(error){
            console.log({message: error})
        }
    }

    async getUsers(req, res){
        try{
            const users = await User.find()
            res.json(users)
        }catch(error){
          console.log(error)  
        }
    }
}

module.exports = new authController()