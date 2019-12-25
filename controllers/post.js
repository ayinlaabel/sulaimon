const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const Admin = require('../models/admin');
const Appointment = require('../models/appointment');
const passport = require('passport');


//===========================================================================================================
//==========================================Patient Entry Routes=============================================
//===========================================================================================================

exports.editProfile = (req, res, next) => {
   const user = {};

   user.name = req.body.name;
   user.email = req.body.email;
   user.dob = req.body.dob;
   //username = req.email;

   let query = {_id:req.params.id}

    User.update(query, user)
        .then(
            () => {
                res.redirect('/patient');
                req.flash('');
            }
        ).catch(
            (error) => {
                console.log(error)
                res.status(404).json({
                    error: error
                });
            }
        );
    Patient.update(query, user)
    .then(
        () => {
            res.redirect('/patient');
            req.flash('');
        }
    ).catch(
        (error) => {
            console.log(error)
            res.status(404).json({
                error: error
            });
        }
    );

}

exports.register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(
        (hash) => {
            const user = new User({
                name:req.body.fullName,                
                dashboard:req.body.dashboard,
                email: req.body.email,
                username: req.body.email,
                dob: req.body.dob,
                password: hash
            });

            const patient = new Patient({
                name:req.body.fullName,                
                dashboard:req.body.dashboard,
                email: req.body.email,
                username: req.body.email,
                dob: req.body.dob,
                password: hash
            });
            user.save()
                .then(
                    () => {
                        res.redirect('/login')
                    }
                ).catch(
                    (error) => {
                        res.redirect('/register')
                    }
                )
            patient.save()
                .then(
                    () => {
                        res.status(201).json({
                            message:'User Added successfully!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            error:error
                        });
                    }
                )
        }
    )


}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/patient',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

exports.appointment = (req, res, next) => {

    let appointment = new Appointment();

    appointment.time = req.body.time;
    appointment.desc = req.body.desc;
    appointment.practice = req.body.practice;
    appointment.doctor = req.body.doctor;
    appointment.name = req.user._id;
    appointment.comment = req.body.comment;


    appointment.save()
        .then(
            () => {
                res.redirect('/patient');
                req.flash('');
            }
        ).catch(
            (error) => {
                console.log(error)
                res.status(404).json({
                    error: error
                });
            }
        );


}

exports.editAppointment = (req, res, next) => {

    let appointment = {};

    appointment.time = req.body.time;
    appointment.desc = req.body.desc;
    appointment.practice = req.body.practice;
    appointment.doctor = req.body.doctor;
    appointment.name = req.user._id;

    let query = {_id:req.params.id}

    Appointment.update(query, appointment)
        .then(
            () => {
                res.redirect('/patient');
                req.flash('');
            }
        ).catch(
            (error) => {
                console.log(error)
                res.status(404).json({
                    error: error
                });
            }
        );
}

exports.delete =  (req, res, next) =>{
    let query = {_id:req.params.id};
  
    Appointment.remove(query, (err) =>{
      if (err) {
        console.log(err);
      } 
      res.send('success');
    });
}


//===========================================================================================================
//==========================================Doctor  Post  Routes=============================================
//===========================================================================================================

exports.doctorEditProfile = (req, res, next) => {
    const user = {};
 
    user.name = req.body.name;
    user.email = req.body.email;
    user.dob = req.body.dob;
    //username = req.email;
 
    let query = {_id:req.params.id}
 
     User.update(query, user)
         .then(
             () => {
                 res.redirect('/patient');
                 req.flash('');
             }
         ).catch(
             (error) => {
                 console.log(error)
                 res.status(404).json({
                     error: error
                 });
             }
         );
    
         Doctor.update(query, user)
         .then(
             () => {
                 res.redirect('/patient');
                 req.flash('');
             }
         ).catch(
             (error) => {
                 console.log(error)
                 res.status(404).json({
                     error: error
                 });
             }
         );
 
 }
 

exports.doctorRegister = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(
        (hash) => {
            // const user = new User({
            //     name:req.body.fullName,                
            //     dashboard:req.body.dashboard,
            //     email: req.body.email,
            //     username: req.body.email,
            //     dob: req.body.dob,
            //     password: hash
            // });
            const doctor = new Doctor({
                name:req.body.fullName,                
                dashboard:req.body.dashboard,
                email: req.body.email,
                username: req.body.email,
                dob: req.body.dob,
                password: hash
            });
            doctor.save()
                .then(
                    () => {
                        res.status(201).json({
                            message:'Doctor Added successfully!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            error:error
                        });
                    }
                )
            // user.save()
            // .then(
            //     () => {
            //         res.status(201).json({
            //             message:'Doctor Added successfully!'
            //         });
            //     }
            // ).catch(
            //     (error) => {
            //         res.status(500).json({
            //             error:error
            //         });
            //     }
            // )
        }
    )


}

exports.doctorLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/doctor/dashboard',
        failureRedirect: '/doctor/login',
        failureFlash: true
    })(req, res, next);
}

exports.doctorEditAppointment = (req, res, next) => {

    let appointment = {};

    appointment.time = req.body.time;
    appointment.desc = req.body.desc;
    appointment.practice = req.body.practice;
    appointment.doctor = req.body.doctor;
    appointment.comment = req.body.comment;

    let query = {_id:req.params.id}

    Appointment.update(query, appointment)
        .then(
            () => {
                res.redirect('/doctor/dashboard');
                req.flash('');
            }
        ).catch(
            (error) => {
                console.log(error)
                res.status(404).json({
                    error: error
                });
            }
        );
}


//===========================================================================================================
//==========================================Admin Post  Routes=============================================
//===========================================================================================================

exports.adminRegister = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(
        (hash) => {
            const user = new User({
                username: req.body.email,
                password: hash
            });
            const admin = new Admin({
                username: req.body.email,
                password: hash
            });
            admin.save()
                .then(
                    () => {
                        res.status(201).json({
                            message:'Admin Added successfully!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            error:error
                        });
                    }
                )
            user.save()
            .then(
                () => {
                    res.status(201).json({
                        message:'Admin Added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error:error
                    });
                }
            )
        }
    )


}

exports.adminLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
}