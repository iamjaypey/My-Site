const mongoose = require('mongoose')
const {Schema} = mongoose;
const postSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
   
    mediaType: {
        type: String
    },
    mediaFile: {
        type: String
    }
},{timestamps: true}); 

const Post = mongoose.model('Post', postSchema);

// Exporting
module.exports = Post;
