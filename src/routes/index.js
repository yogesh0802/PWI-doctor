const express = require("express");
// const express = require("path");



const router = express.Router();

router.get('/appointmnet', (req, res) => {
    res.render('/appointment.html');
})
// router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   })

module.exports = router;