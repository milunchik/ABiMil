const UserProfile = require('./models/UserProfile')

const getUsers = async(req, res)=>{
    try{
        const user = await UserProfile.find()
        res.status(200).json(user)
    }catch(err){
        res.status(400).send({message: err})
    }
}

const getOneUser = async(req, res)=>{
    try{
        const id = req.params._id
        const user = await UserProfile.findOne({_id: id})
        res.status(200).json(user)
    }catch(err){
       res.status(400).send({message: err})
    }
}

const getAllUsers = async(req, res)=>{
    try{
        const users = await UserProfile.find()
        res.status(200).json(users)
    }catch(err){
        res.status(400).send({message: err})
    }
}

const postUsers = async(req, res)=>{
    try{
        const {username, bio, img} = req.body
        const newUser = await UserProfile.create({username, bio, img})
        res.status(200).json(newUser)
    }catch(err){
        res.status(400).send({message: err})
    }
}

const updateUser = async(req, res)=>{
    try{
        const {id} = req.params
        const {username, bio, img} = req.body
        const user = await UserProfile.findOneAndUpdate({_id: id}, {username, bio, img})
        res.status(200).json(user)
    }catch(err){
        res.status(400).send({message: err})
    }
}

const deleteUser = async(req, res)=>{
    try{
        const {id} = req.params
        const user = await UserProfile.findOneAndDelete({_id: id})
        res.status(200).json(user)
    }catch(err){
        res.status(400).send({message: err})
    }
}

module.exports = {
    getUsers,
    getOneUser,
    getAllUsers,
    postUsers,
    updateUser,
    deleteUser
}