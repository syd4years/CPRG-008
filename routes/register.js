/*
David Grant
2021/07/25
CPRG-008
Assignment 2
*/

var express = require("express")
// Model for customer schema
const RegisterCust = require("../models/postModel").RegisterCust
const router = express.Router()



router.get("/", function (req,res,next) {
    res.render("register")
})


// Post registration form to database
router.post("/", (req,res,next) => {

    const register = new RegisterCust()

    register.email = req.body.email,
    register.password = req.body.password,
    register.fname = req.body.fname,
    register.lname = req.body.lname,
    register.address = req.body.address,
    register.postal = req.body.postal,
    register.province = req.body.province,
    register.country = req.body.country

    
    // Render error array if errors, otherwise save data to database and redirect to thank you page
    register.save(err => {
        if (err) {
            const errorArray = [];
            const errorKeys = Object.keys(err.errors);
            errorKeys.forEach(key => errorArray.push(err.errors[key].message));
            return res.render("register", {
              errors: errorArray
            })
        }
        res.redirect("/thank-you")
    })
})



module.exports = router