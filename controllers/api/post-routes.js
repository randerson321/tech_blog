const router = require('express').Router();
const {Post} = require('../../models');

router.post('/', withAuth, async (req, res) => {
  try {
    const post = await Post.create({...req.body, userId: req.session.userId});

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.update(req.body, {where: {id: req.params.id}});

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'No post with that ID'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.destroy({where: {id: req.params.id}});

    if (post){
      res.status(200).json({post, message: "Post deleted"});
    } else {
      res.status(404).json({message: 'No post found with that ID'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
