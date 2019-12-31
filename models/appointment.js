const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const appointSchema = mongoose.Schema({
    name:{
        type: String,
        // required: true
    },
    practice:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    doctor:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        required: true,
    },
    tel:{
        type:String,
        required: true,
    },
    comment:{
        type:String,
        // required: true,
    }
});

module.exports = mongoose.model('Appointment', appointSchema);