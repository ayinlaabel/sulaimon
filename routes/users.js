var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/post')


router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/appointment', ensureAuthenticated, userCtrl.appointment);

//Router Authenticated
function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('danger', 'You are require to login');
      res.redirect('/login');
    }
  }

module.exports = router;
