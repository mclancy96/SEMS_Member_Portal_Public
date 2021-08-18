var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var NewMember = require('../models/newMember');
var middleware = require('../middleware');
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const Notification = require("../models/notification");


router.get("/admin/inventory", middleware.isLoggedIn, middleware.notiCount, async function(req,res){
	res.render("./admin/inventory", {currentUser: req.user, notiCount:res.locals.notiCount,});
});


module.exports = router;