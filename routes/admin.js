var express = require('express');
var router = express.Router();
var User = require('../models/user');
var NewMember = require('../models/newMember');
var middleware = require('../middleware');


router.get("/admin/inventory", async function(req,res){
	res.render("./admin/inventory", {});
});


module.exports = router;