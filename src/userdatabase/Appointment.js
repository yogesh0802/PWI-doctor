const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true
    },
    dtext: {
        type: String,
        require: true
    }

})

const Appointment = mongoose.model('Appointment', appSchema);
module.exports = Appointment;