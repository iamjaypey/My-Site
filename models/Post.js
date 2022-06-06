const mongoose = require('mongoose')
const {Schema} = mongoose;
const postSchema = new Schema({
    title: {
        type: string
    },
    content: {
        type: string
    },
   
    file: {
        type: string
    }
});
    
// {timestamps: true});

const Post = mongoose.model('Post', postSchema);

// Exporting
module.exports = Post;
