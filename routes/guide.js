var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
const Notification = require("../models/notification");

router.get("/guide/new_member_cheat_sheet", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/new_member_cheat_sheet", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/becoming_active_member", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/becoming_active_member", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/new_member_faqs", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/new_member_faqs", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/active_member", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/active_member", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/crew_chief", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/crew_chief", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/becoming_EMT", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/becoming_EMT", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/registering_for_course", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/registering_for_course", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/training_fund", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/training_fund", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/ems_skills", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/ems_skills", {currentUser: req.user, notiCount:res.locals.notiCount});
});

router.get("/guide/ride-along", middleware.isLoggedIn, middleware.notiCount, function(req,res){
	res.render("./guide/ride-along", {currentUser: req.user, notiCount:res.locals.notiCount});
});

module.exports = router;