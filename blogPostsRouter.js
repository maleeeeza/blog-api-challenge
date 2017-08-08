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


// DELETE blog post by id


// PUT (update) blog post

module.exports = router;
