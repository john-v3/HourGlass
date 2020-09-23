const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    title: {type: String},
    author: {type: mongoose.Types.ObjectId},
    privacyLevel: {type: String},
    timePosted: {type: mongoose.Schema.Types.Date},
    link: {type: String},
    text: {type: String},
    file: {type: String}

});

const Content = mongoose.model('content', contentSchema, 'content')

module.exports = Content;
