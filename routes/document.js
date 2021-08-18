var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
const Notification = require("../models/notification");




router.get("/document/crew_run_form", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./document/crew_run_form", {currentUser: req.user, notiCount:res.locals.notiCount});
});

// router.get("/document/pcr", middleware.isLoggedIn, middleware.notiCount, function(req,res){
// 	res.render("./document/pcr", {currentUser: req.user, notiCount:res.locals.notiCount});
// });

// router.get("/document/bag_check", middleware.isLoggedIn, middleware.notiCount, function(req,res){
// 	res.render("./document/bag_check", {currentUser: req.user, notiCount:res.locals.notiCount});
// });

router.get("/document/sops_bylaws", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./document/sops_bylaws", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/document/onboarding", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./document/onboarding", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/document/member_manual", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./document/member_manual", {currentUser: req.user, notiCount:res.locals.notiCount});
});

// router.get("/document/amt", middleware.isLoggedIn, function(req,res){
// 	res.render("./document/amt");
// });

// router.get("/document/amc", middleware.isLoggedIn, function(req,res){
// 	res.render("./document/amc");
// });

// router.get("/document/cct", middleware.isLoggedIn, function(req,res){
// 	res.render("./document/cct");
// });

// router.get("/document/ccc", middleware.isLoggedIn, function(req,res){
// 	res.render("./document/ccc");
// });

// router.get("/document/presentations", middleware.isLoggedIn, function(req,res){
// 	res.render("./document/presentations");
// });

// router.get("/document/attendance", middleware.isLoggedIn, function(req,res){
// 	res.render("./document/attendance");
// });

// router.get("/document/agenda", middleware.isLoggedIn, function(req,res){
// 	res.render("./document/agenda");
// });

module.exports = router;