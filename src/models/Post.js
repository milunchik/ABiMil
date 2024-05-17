const {Schema, model} = require('mongoose')

const Post = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true}
})

module.exports = model('Post', Post)