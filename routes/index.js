const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res) {
  res.render('index', { user: req.user });
});

/* GET home page. */
router.get(
  '/auth/google',
  passport.authenticate(
    'google', {
    scope: ['profile', 'email']
  })
)

// Google OAuth callback route
router.get(
  '/oauth2callback',
  passport.authenticate(
    'google', {
    successRedirect: '/',
    failureRedirect: '/',
  })
)

// OAuth logout route
router.get(
  '/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  }
)

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
