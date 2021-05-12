var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");




router.get("/document/crew_run_form", function(req,res){
	res.render("./document/crew_run_form", {});
});

// router.get("/document/pcr", function(req,res){
// 	res.render("./document/pcr", {});
// });

// router.get("/document/bag_check", function(req,res){
// 	res.render("./document/bag_check", {});
// });

router.get("/document/sops_bylaws", function(req,res){
	res.render("./document/sops_bylaws", {});
});

router.get("/document/onboarding", function(req,res){
	res.render("./document/onboarding", {});
});

router.get("/document/member_manual", function(req,res){
	res.render("./document/member_manual", {});
});

// router.get("/document/amt", function(req,res){
// 	res.render("./document/amt");
// });

// router.get("/document/amc", function(req,res){
// 	res.render("./document/amc");
// });

// router.get("/document/cct", function(req,res){
// 	res.render("./document/cct");
// });

// router.get("/document/ccc", function(req,res){
// 	res.render("./document/ccc");
// });

// router.get("/document/presentations", function(req,res){
// 	res.render("./document/presentations");
// });

// router.get("/document/attendance", function(req,res){
// 	res.render("./document/attendance");
// });

// router.get("/document/agenda", function(req,res){
// 	res.render("./document/agenda");
// });

module.exports = router;