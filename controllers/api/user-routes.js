const router = require('express').Router();
const {User} = require('../../models');

router.post('/', async (req, res) => {
  try {
    const user = await User.create({username: req.body.username, password: req.body.password});

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.logged_in = true;
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({where: {username: req.body.username}});

    if (!user){
      res.status(404).json({message: 'Incorrect username or password.'});
    }

    const passwordValidation = await user.checkPassword(req.body.password);

    if(passwordValidation) {
      req.session.save(() => {
        req.session.userId = user.id;
        req.session.logged_in = true;
      })

      res.json({user, message: 'You are now logged in'});
    } else {
      res.status(404).json({message: 'Incorrect username or password.'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/logout', (req, res) => {
  try {
    req.session.logged_in ? req.session.destroy() : null;

    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;