const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const users_schema1 = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    phone:{
        type:Number,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    confirm_password:{
        type:String,
        required:true,
    }

})
//coverting to ket before storying in database
users_schema1.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10)
    // this.confirm_password = await bcrypt.hash(this.confirm_password,10)
})

const users_collection1 =mongoose.model('users_collection1',users_schema1);
module.exports = users_collection1;