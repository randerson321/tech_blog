const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
      const data = await Post.findAll({include: [{model: User}]});

      let posts = data.map(post => post.get({plain: true}));

      res.render('all-posts', {posts, logged_in: req.session.logged_in});
  } catch(error) {
      res.status(500).json(error);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id, {indclude: [{model: User}, {model: Comment, include: {model: User}}]});

        if (data){
            const post = data.get({plain: true});
            const comments = post.comments;

            res.render('single-post', {post, comments, logged_in: req.session.logged_in});
        } else {
            res.status(500).json({message: 'No post with that ID'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/dashboard');
        return;
    } else{
        res.render('login');
    }
});

router.get('/signup', (req, res) => {
 res.render('signup');
});

module.exports = router;