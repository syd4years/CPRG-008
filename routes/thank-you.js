/*
David Grant
2021/07/25
CPRG-008
Assignment 2
*/

var express = require('express');
var router = express.Router();

// Registration model
const RegisterCust = require("../models/postModel").RegisterCust
const register = new RegisterCust()

    


router.get('/', function (req, res, next) {
  RegisterCust.find((err, posts) => {

    res.render('thank-you', { displayPosts: posts });
  });
});

module.exports = router;