var express = require('express');
var router = express.Router();

const entryCtrl = require('../controllers/entry');
const userCtrl = require('../controllers/post');

// router.get('/', entryCtrl.admin);
router.get('/register', entryCtrl.adminRegister);
router.get('/login', entryCtrl.adminLogin);
router.get('/dashboard', ensureAuthenticated, entryCtrl.adminDashboard);
router.get('/patients', ensureAuthenticated, entryCtrl.adminPatient);
router.get('/logout', entryCtrl.adminLogout);


//Post Routes
router.post('/register', userCtrl.adminRegister);
router.post('/login', userCtrl.adminLogin);

//Appointment Routes
// router.get('/appointment/:id', ensureAuthenticated, entryCtrl.doctorEditAppointment);
// router.post('/appointment/:id', ensureAuthenticated, userCtrl.doctorEditAppointment);


//Router Authenticated
function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('danger', 'You are require to login');
      res.redirect('/admin/login');
    }
  }


module.exports = router;