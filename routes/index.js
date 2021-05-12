var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var passport = require("passport");
var User = require("../models/user");
const crypto = require("crypto");
const Shift = require("../models/shift");
var nodeoutlook = require('nodejs-nodemailer-outlook')



const nodemailer = require('nodemailer');

//Root Route, i.e., The Landing
router.get("/", async function(req,res){
	var foundShifts = await Shift.find({startDateMS: {$gte: Date.now()}}).sort({startDateMS: 1});
	var officers = await User.find({accessLevel: "officer"});
	res.render("./landing", {foundShifts:foundShifts, officers:officers});
});


//Login form route (not the logic)
router.get("/login", function(req, res){
	res.render("login");
});

//Login logic
// router.post("/login", passport.authenticate('local', {failureRedirect: '/login', failureFlash:true}),
// 	function(req, res) {
//     res.redirect('/');
// });
	
//Logout route
// router.get("/logout", function(req, res){
// 	req.logout();
// 	req.flash("success", "Logged you out!");
// 	res.redirect("/login");
// })

//Officer Dashboard
router.get("/officerDashboard", async function(req, res){
	var officers = await User.find({accessLevel: "officer"});
	var crewChiefs = await User.find({$or:[{accessLevel: "officer"}, {title: "Crew Chief"}, {title:"FTO"}]});
	var allUsers = await User.find({onRoster: true});
	var emts = await User.find({$or:[{accessLevel: "officer"}, {title: "Crew Chief"}, {title:"FTO"}, {title:"EMT"}]});
	var nonEmts = await User.find({$or:[{title: "Secretary"}, {title:"Non-EMT"}]});
	res.render("./officerDashboard", {officers:officers, allUsers:allUsers, crewChiefs:crewChiefs, emts:emts, nonEmts:nonEmts});
})


//Forgot Password form
router.get("/forgotPassword", function(req,res){
	res.render("forgotPassword");
});

// let transporter = nodemailer.createTransport({
// 	host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
// 		type: 'OAuth2',
// 		user: process.env.MAILUSER,
// 		clientId: process.env.MAILID,
// 		clientSecret: process.env.MAILSECRET,
// 		refreshToken: process.env.MAILREFRESH, 
// 		accessToken: process.env.MAILACCESS
//     },
// 	tls:{
// 		rejectUnauthorized: false
// 	}
// });

// router.post('/forgotPassword', function (req, res){
// 	if (req.body.email === '') {
// 		req.flash("error", "Email is required")
// 		res.redirect("forgotPassword");
//     };
// 	User.findOne({email: req.body.email}).then(function(user) {
// 		if (user === null) {
// 			req.flash("error", "This email is not associated with anyone in our database. Please try again")
// 			res.redirect("forgotPassword");
// 		} else {
// 			const tokenSet = crypto.randomBytes(20).toString('hex');
// 			const token = tokenSet;
// 			User.findOneAndUpdate({email: req.body.email},{
// 				resetPasswordToken: tokenSet,
// 				resetPasswordExpires: Date.now() + 3600000
// 			}, {new: true}).then( function (user) {
			
// 				nodeoutlook.sendEmail({
// 					auth: {
// 						user: process.env.MAILEREMAIL,
// 						pass: process.env.MAILERPASS
// 					},
// 					from: process.env.MAILEREMAIL,
// 					to: `${user.email}`,
// 					replyTo: 'stocktonems-club@go.stockton.edu',
// 					subject: 'Link To Reset Password',
// 					text:
// 						'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n'
// 					+ 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
// 					+ `http://${process.env.DOMAIN}/reset/${user.resetPasswordToken}\n\n`
// 					+ 'After one hour, your reset link will no longer work, and you will have to resend the forgot password email.\n'
// 					+ 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
// 					onError: (e) => console.log("Error! "+e),
// 					onSuccess: (i) => console.log("Message sent!")
// 				});
// 				// const mailOptions = {
// 				// 	from: process.env.MAILEREMAIL,
// 				// 	to: `${user.email}`,
// 				// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 				// 	subject: 'Link To Reset Password',
// 				// 	text:
// 				// 		'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n'
// 				// 	+ 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
// 				// 	+ `http://${process.env.DOMAIN}/reset/${user.resetPasswordToken}\n\n`
// 				// 	+ 'After one hour, your reset link will no longer work, and you will have to resend the forgot password email.\n'
// 				// 	+ 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
// 				// };
// 				// console.log('sending mail');
// 				// transporter.sendMail(mailOptions, function (err) {
// 				// 	if (err) {
// 				// 		console.log("Error! " + err.message);
// 				// 	} else {
// 				// 		const notiData = new Notification({createdBy: {id: user.id, name: user.name}, effectedMember: {id: user.id, name: user.name}, created: Date.now(), accessLevel: "officer", message: user.name + " has requested to reset their password."});
// 				// 		notiData.save(function(err, newNoti){});
// 				// 		console.log("Email successfully sent!");
// 				// 	}
// 				// });
// 				req.flash("success", "An email will be sent to your email address shortly. Please wait at least ten minutes before requesting to send a new email if you have not received an email. Additionally, please check your spam folder.")
// 				res.redirect("back");
// 			}
// 		)}
// 	}
// )});

// router.get('/reset/:token', function (req, res){
// 	User.findOne({resetPasswordToken: req.params.token}).then( function(user) {
// 		if (user == null || user.resetPasswordExpires < Date.now()) {
// 			res.locals.show = false;
// 			req.flash("error", "Password reset link is invalid or has expired");
// 			res.redirect("/forgotPassword");
// 		} else {
// 			res.locals.show= true;
// 			res.render("resetPassword", {user: user, show: res.locals.show})
//     	}
//     })
// });

// router.put("/resetPassword", function(req, res){
// 	User.findByUsername(req.body.email).then(function(sanitizedUser){
// 		if (sanitizedUser){
// 			sanitizedUser.setPassword(req.body.password, function(){
// 				sanitizedUser.save();
				
// 			})
// 			User.findOneAndUpdate({email: req.body.email},{
// 				resetPasswordToken: null,
// 				resetPasswordExpires: null
// 			}, {new: true}).then( function(user){
// 				console.log("Token Reset: "+ user.resetPasswordToken);
// 				console.log("Token Expires: "+ user.resetPasswordExpires);
// 				console.log("Password: "+ user.password);
// 				const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, effectedMember: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", message: sanitizedUser.name + " has reset their password."});
// 				notiData.save(function(err, newNoti){});
// 				req.flash("success", "Your password has been successfully update! Please try signing in");
// 				res.render("login");
// 			})
// 		} else {
// 			res.status(500).json({message: 'This user does not exist'});
// 		}
// 	});
// });

router.get("/notifications", function(req, res){
	Notification.find({"created": {$gte: new Date((new Date().getTime() - (2592000000)))}}).sort({created: -1}).exec(function(err, allNotifications){
		res.render("notifications", {notifications: allNotifications});
		
	});
	Notification.updateMany({"readBy" : {$not: { $in: [req.user.id] }}}, { $push: { "readBy" :  req.user.id} }, function(err){ if(err){console.log(err.message) }});
});

module.exports = router;