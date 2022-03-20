const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
//Require the correct files from the models and authorizations

router.get('/', withAuth, async (req, res) => {
  //Create the correct asychronous get route for this function
  try {
    const data = await User.findByPk(req.session.userId, {attributes: {exclude: ['password']}, include: [{model: Post}]});
    const user = data.get({plain: true});

    res.render('dashboard', {...user, logged_in: req.session.logged_in});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  // Create the correct get route functionality using an asychronous function
  try {
    const data = Post.findByPk(req.params.id);
    const post = data.get({plain: true});

    res.render('edit-post', {post, logged_in: req.session.logged_in});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
