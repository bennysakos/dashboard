const express = require('express');
const passport = require('passport');
const router = express.Router();

// OAuth login route
router.get('/login', passport.authenticate('discord'));

// Callback route
router.get('/callback', passport.authenticate('discord', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/dashboard');
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;

