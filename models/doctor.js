const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const doctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dashboard:{
        type: String,
        // required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    dob:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
});

doctorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Doctor', doctorSchema);