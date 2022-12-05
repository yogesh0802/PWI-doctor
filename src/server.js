require("./userdatabase/monogoes_connection.js")
const express = require('express')
const bodyparser = require('body-parser')
const flash = require('connect-flash');
const path = require('path')
const indexroute = require("./routes/index.js");
const port = 8000
const users_collection1 = require('./userdatabase/userdata')
const Appointment = require('./userdatabase/Appointment')
const mongoose = require('mongoose')
// const users_collection1 = require('./userdata')
const jwt = require("jsonwebtoken");
const app = express()
const bcrypt = require('bcryptjs')
const checkAuth = require('./middlewares/checkAuth');
const contactus = require("./userdatabase/contactus");


app.use(bodyparser.urlencoded(
    {
        extended: true
    })
)


app.use(express.json())
app.use(flash());

//routes
app.use(indexroute);

let mainfolder = path.join(__dirname, "../")
//middleware
app.use(express.static(mainfolder))
//to generate bycrypt password
const hashedpassword = async (password)=>{
    const hashkey = await bcrypt.hash(password,10)
    return hashkey
}


app.get('/home', (req, res) => {
    res.sendFile(mainfolder + "./index.html");
})

app.get('/register', (req, res) => {
    res.sendFile(mainfolder + "/register.html")
})

app.get('/login', (req, res) => {
    res.sendFile(mainfolder + "/register.html")
})


app.get('/appointment', (req, res) => {
    res.sendFile(mainfolder + "/appointment.html")
})

app.get('/get', (req, res) => {
    res.sendFile(mainfolder + "/get.html")
})

app.get('/contactus', (req, res) => {
    res.sendFile(mainfolder + "/contactus.html")
})

app.get('/alert', (req, res) => {
    res.sendFile(mainfolder + "/alert.html")
})

app.post("/register", async(req, res) => {
    // console.log("Hello");
    console.log(req.body);
    let req_userdata = new users_collection1(req.body)
    // console.log(req_userdata.password);
    // console.log(req_userdata.confirm_password);
    if (req_userdata.password == req_userdata.confirm_password) {
        
        req_userdata.save();
        // res.send("Registered sucessfull!")
        res.redirect('/login');
    }
    else {
        res.send("password do not matched!!")
    }

})

app.post("/login",async(req,res)=>{
    let usermail=req.body.email;
    let userpassword=req.body.password;

    // let mykey_password = await hashedpassword(userpassword)
    // console.log(mykey_password)
    // console.log(usermail)
    // console.log(userpassword)

    let req_userdata = await users_collection1.findOne({email:usermail});
    if(req_userdata!= null){
        // res.send("Email exit")
        const bcrypt_password_match = await bcrypt.compare(userpassword,req_userdata.password)
        // console.log(bcrypt_password_match)
        if(bcrypt_password_match == true){
            // res.send('sucessfully login')
            res.sendFile(mainfolder + "/index.html")
        }
        else{
            res.send("Incorrect Password")
        }
    }
    else{

        res.send("Email not exit")
    }

    
})

app.post("/appointment", (req, res) => {
    console.log(req.body);
    let new_entry = new Appointment(req.body)
    new_entry.save();
    // res.send("Thanks You your appointment get confirmed")
    res.redirect('/alert');
})

app.post("/contactus", (req, res) => {
    console.log(req.body);
    let new_entry = new contactus(req.body)
    new_entry.save();
    // res.send("Thanks You your valuable feedback")
    res.redirect('/home');
})

app.listen(port, () => {
    console.log(`Server running on Port ${port}`)
})

