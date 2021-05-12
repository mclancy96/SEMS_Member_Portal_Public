var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/guide/new_member_cheat_sheet",  function(req,res){
	res.render("./guide/new_member_cheat_sheet", {});
});

router.get("/guide/becoming_active_member",  function(req,res){
	res.render("./guide/becoming_active_member", {});
});

router.get("/guide/new_member_faqs",  function(req,res){
	res.render("./guide/new_member_faqs", {});
});

router.get("/guide/active_member",  function(req,res){
	res.render("./guide/active_member", {});
});

router.get("/guide/crew_chief",  function(req,res){
	res.render("./guide/crew_chief", {});
});

router.get("/guide/becoming_EMT",  function(req,res){
	res.render("./guide/becoming_EMT", {});
});

router.get("/guide/registering_for_course",  function(req,res){
	res.render("./guide/registering_for_course", {});
});

router.get("/guide/training_fund",  function(req,res){
	res.render("./guide/training_fund", {});
});

router.get("/guide/ems_skills",  function(req,res){
	res.render("./guide/ems_skills", {});
});

router.get("/guide/ride-along",  function(req,res){
	res.render("./guide/ride-along", {});
});

module.exports = router;