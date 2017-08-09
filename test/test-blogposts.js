const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);


describe('BlogPosts', function() {

  before(function() {
    return runServer();
  });


  after(function() {
    return closeServer();
  });



  it('should list all Blog Posts on GET', function() {

    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
        res.body.forEach(function(story) {
          story.should.be.a('object');
          story.should.include.keys(expectedKeys);
        });
      });
  });

  it('should add a Blog Post on POST', function() {
    const newBlogPost = {title: 'Skynet: is it really fiction?', content: 'content for skynet story', author: 'Donald Trump'};
    return chai.request(app)
      .post('/blog-posts')
      .send(newBlogPost)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newBlogPost, {id: res.body.id}, {publishDate: res.body.publishDate}));
      });
  });

  it('should throw error on POST if field is missing', function() {
    const newBlogPost = {title: 'Skynet: is it really fiction?', content: 'content for skynet story'};
    return chai.request(app)
      .post('/blog-posts')
      .send(newBlogPost)
      .then(function(res) {
        res.should.not.have.status(200);
      }, function(res) {
        res.should.have.status(400);
      });
  });



  it('should update Blog Posts on PUT', function() {
    const updateData = {
        title: 'Skynet: is it really fiction?',
        content: 'content for skynet story',
        author: 'Steve Bannon'
    };

    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        updateData.id = res.body[0].id;

        return chai.request(app)
          .put(`/blog-posts/${updateData.id}`)
          .send(updateData);
      })

      .then(function(res) {
        res.should.have.status(204);
      });
  });

  it('should throw error on PUT if ids do not match', function() {
  const updateData = {
      title: 'Skynet: is it really fiction?',
      content: 'content for skynet story',
      author: 'Steve Bannon'
    };


  return chai.request(app)
    .get('/blog-posts')
    .then(function(res) {
      updateData.id != res.body[0].id;

      return chai.request(app)
        .put(`/blog-posts/${updateData.id}`)
        .send(updateData);
    })

    .then(function(res) {
      res.should.not.have.status(200);
    }, function(res) {
      res.should.have.status(400);
    });
  });

  it('should throw error on PUT if field is missing', function() {
    const updateData = {
        title: 'Skynet: is it really fiction?',
        content: 'content for skynet story'
    };

    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        updateData.id = res.body[0].id;

        return chai.request(app)
          .put(`/blog-posts/${updateData.id}`)
          .send(updateData);
      })

      .then(function(res) {
        res.should.not.have.status(200);
      }, function(res) {
        res.should.have.status(400);
      });
  });


  it('should delete Blog Posts on DELETE', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });



});
