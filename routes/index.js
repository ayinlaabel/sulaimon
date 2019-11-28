var express = require('express');
var router = express.Router();

const entryCtrl = require('../controllers/entry');
const userCtrl = require('../controllers/post');

// Patient Routes
router.get('/', entryCtrl.home);
router.get('/patient', ensureAuthenticated, entryCtrl.patient);
router.get('/login', entryCtrl.login);

//Appointment Routes
router.get('/patient/appointment/:id', ensureAuthenticated, entryCtrl.editAppointment);
router.post('/patient/appointment/:id', ensureAuthenticated, userCtrl.editAppointment);
router.get('/patient/:id', ensureAuthenticated, entryCtrl.delete);

//Profile Route
router.get('/profile', ensureAuthenticated, entryCtrl.profile)

router.get('/register', entryCtrl.register);
router.get('/logout', entryCtrl.logout);


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
