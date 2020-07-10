/*
 * app.login.controller.js
 * This controller module exposes one methods
 *
 */
const express = require('express');


//jump to the login page
module.exports.showLoginPage= function(req, res){
    let sess = req.session;
    res.render('index.ejs');
}


