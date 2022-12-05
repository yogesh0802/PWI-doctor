const mongoose = require('mongoose');

const contactschema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    ctext: {
        type: String,
        require: true,
    }

})

const contactus = mongoose.model('contactus', contactschema);
module.exports = contactus;