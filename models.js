const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: String,
    lastName: String
  }
},
  {
   collection: 'blogs'
  }
);

blogSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()
});

blogSchema.methods.apiRepr = function() {

  return {
    id:this.id,
    title: this.title,
    content: this.content,
    author: this.authorString
  };
}

const BlogPosts = mongoose.model('BlogPosts', blogSchema);

module.exports = {BlogPosts};
