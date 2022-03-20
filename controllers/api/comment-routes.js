const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const comment = await Comment.create({...req.body, userId: req.session.userId});

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;