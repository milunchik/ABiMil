const {Schema, model} = require('mongoose')

const UserProfile = new Schema({
    username: {type: String, unique: true, required: true},
    bio: {type: String, required: true},
    img: {type: String, required: false}
})

module.exports = model('UserProfile', UserProfile)