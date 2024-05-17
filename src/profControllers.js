const PostModel = require('./models/Post')

const getPosts = async(req, res)=>{
    try{
        const posts = await PostModel.find()
        res.status(200).json({posts})
    }catch(err){
        res.status(400).send(err)
    }
}

const postPost = async(req, res) =>{
    try{
        const {title, text} = req.body; 
        const newPost = await PostModel.create({title, text})
        res.status(200).json(newPost)
    }catch(err){
        res.status(400).send(err)
    }
}

const updatePost = async(req, res)=>{
    try{
        const {id} = req.params
        const{title, text} = req.body
        const updatePost = await PostModel.findByIdAndUpdate(id, {title, text})
        res.status(200).json(updatePost)    
    }catch(err){
        res.status(400).send(err)
    }
}

const deletePost = async(req, res)=>{
    try{
        const {id} = req.params
        const deletePost = await PostModel.findByIdAndDelete(id)
        if(!deletePost){
            return res.status(401).json({message: 'Post not found'})
        }
        res.status(200).json({message: 'Post deleted'})
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports = {
    getPosts,
    postPost,
    updatePost,
    deletePost
}