var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index)
router.post('/', usersCtrl.create)
router.get('/new', usersCtrl.new)
router.get('/:id', usersCtrl.show)

// function isLoggedIn(req, res, next) {
//     if ( req.isAuthenticated() ) return next();
//     res.redirect('/auth/google');
//   };

module.exports = router