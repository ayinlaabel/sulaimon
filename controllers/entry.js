const mongoose = require('mongoose');

//Models
const Appointment = require('../models/appointment');
const User = require('../models/user');
const Patient = require('../models/patient');


//===========================================================================================================
//==========================================Patient Entry Routes=============================================
//===========================================================================================================

exports.home = (req, res, next) => {
    res.render('index')
}

exports.patient = (req, res, next) => {
    Appointment.find({}).then(
        (appointments) =>{
            res.render('appointment', {
                appointments: appointments
            });
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
}

exports.login = (req, res, next) => {
    res.render('login');
}

exports.profile = (req, res, next) => {
    res.render('profile')
}

exports.register = (req, res, next) => {
    res.render('register');
}

exports.editAppointment = (req, res, next) => {
   Appointment.findById(req.params.id)
    .then(
       (appointment) =>{
        res.render('editAppointment', {
            appointment: appointment
        })
       }
    )
    .catch(
        (error) => {
            console.log(error);
        }
    )
}

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logout Successful');
    res.redirect('/');
};


exports.delete = (req, res, next) => {
    mongoose.model('Appointment').remove({_id:req.params.id}, (err, deldata) => {
        res.redirect('/patient');
    })
    // res.send(req.params.id);
}


//===========================================================================================================
//==========================================Doctor  Entry Routes=============================================
//===========================================================================================================

exports.doctorPatient = (req, res, next) => {
    Patient.find({}).then(
        (users) =>{
            res.render('./doctor/patient', {
                users:users
            })
        }
    ).catch()
}

exports.doctor = (req, res, next) => {
    res.render('./doctor/doctor')
}

exports.doctorLogin = (req, res, next) => {
    res.render('./doctor/login');
}

exports.doctorRegister = (req, res, next) => {
    res.render('./doctor/register');
}

exports.dashboard = (req, res, next) => {
    Appointment.find({}).then(
        (appointments) =>{
            res.render('./doctor/appointments', {
                appointments: appointments
            });
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
}

exports.doctorEditAppointment = (req, res, next) => {
    Appointment.findById(req.params.id)
     .then(
        (appointment) =>{
         res.render('./doctor/editAppointment', {
             appointment: appointment
         })
        }
     )
     .catch(
         (error) => {
             console.log(error);
         }
     )
 }

 exports.doctorLogout = (req, res) => {
    req.logout();
    req.flash('success', 'Logout Successful');
    res.redirect('/doctor/login');
};


//===========================================================================================================
//==========================================Admin  Entry  Routes=============================================
//===========================================================================================================

exports.adminPatient = (req, res, next) => {
    Patient.find({}).then(
        (users) =>{
            res.render('./admin/patient', {
                users:users
            })
        }
    ).catch()
}

// exports.admin = (req, res, next) => {
//     Patient.find({}).then(
//         (users) =>{
//             res.render('./admin/doctor', {
//                 users:users
//             })
//         }
//     ).catch()
// }

exports.adminLogin = (req, res, next) => {
    res.render('./admin/login');
}

exports.adminRegister = (req, res, next) => {
    res.render('./admin/register');
}

exports.adminDashboard = (req, res, next) => {
    Appointment.find({}).then(
        (appointments) =>{
            res.render('./admin/appointments', {
                appointments: appointments
            });
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
}

// exports.doctorEditAppointment = (req, res, next) => {
//     Appointment.findById(req.params.id)
//      .then(
//         (appointment) =>{
//          res.render('./admin/editAppointment', {
//              appointment: appointment
//          })
//         }
//      )
//      .catch(
//          (error) => {
//              console.log(error);
//          }
//      )
//  }

 exports.adminLogout = (req, res) => {
    req.logout();
    req.flash('success', 'Logout Successful');
    res.redirect('/admin/login');
};