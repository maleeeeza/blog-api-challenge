const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

// create some mock blog posts
BlogPosts.create('An Algorithm Trained on Emoji Knows When You’re Being Sarcastic on Twitter', 'test content', 'Will Knight');

BlogPosts.create('Biological Teleporter Could Seed Life Through Galaxy', 'test content', 'Brian Alexander');


// GET all blog posts
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});


// POST new blog posts
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});

// DELETE blog post by id
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog with ID \`${req.params.ID}\``);
  res.status(204).end();
});







module.exports = router;
