const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const patientSchema = mongoose.Schema({
    image: {
        type: String
    },
    name:{
        type: String,
        // required: true
    },
    dashboard:{
        type: String,
        // required: true
    },
    email:{
        type:String,
        // required: true,
        unique: true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    dob:{
        type:String,
        // required: true
    },
    password:{
        type:String,
        required:true
    }
});

patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Patient', patientSchema);