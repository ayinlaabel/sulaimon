const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
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
        // required: true,
        unique: true
    },
    dob:{
        type:String,
        // required: true
    },
    gender:{
        type:String,
        // required: true
    },
    tel:{
        type:String,
        // required: true
    },
    address:{
        type:String,
        // required: true
    },
    identification:{
        type:String,
        // required: true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);