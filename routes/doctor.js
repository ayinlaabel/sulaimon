var express = require('express');
var router = express.Router();

const entryCtrl = require('../controllers/entry');
const userCtrl = require('../controllers/post');

router.get('/', entryCtrl.doctor);
router.get('/patients', ensureAuthenticated, entryCtrl.doctorPatient);
router.get('/login', entryCtrl.doctorLogin);
router.post('/login', userCtrl.doctorLogin);
router.get('/logout', entryCtrl.doctorLogout);
router.get('/register', entryCtrl.doctorRegister);
router.post('/register', userCtrl.doctorRegister);
router.get('/dashboard', ensureAuthenticated, entryCtrl.dashboard);

//Appointment Routes
router.get('/appointment/:id', ensureAuthenticated, entryCtrl.doctorEditAppointment);
router.post('/appointment/:id', ensureAuthenticated, userCtrl.doctorEditAppointment);


//Router Authenticated
function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('danger', 'You are require to login');
      res.redirect('/doctor/login');
    }
  }


module.exports = router;