const express = require('express')
const router = express.Router()
const controllers = require('./profControllers')

router.get('/allposts', controllers.getPosts)
router.post('/post', controllers.postPost)
router.put('/updatepost/:id', controllers.updatePost)
router.delete('/deletepost/:id', controllers.deletePost)

module.exports = router