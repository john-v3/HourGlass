const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    dateCreated: {type: Date},
    bio: {type: String},
    
});

const User = mongoose.model('user', contentSchema)

module.exports = User;
