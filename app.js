//===============SEMS app====================

const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	//   mongoose = require("mongoose"),
	  //flash = require("connect-flash"),
      //seedDB = require("./seed"),
	//   passport = require("passport"),
	//   LocalStrategy = require("passport-local"),
	//   passportLocalMongoose = require("passport-local-mongoose"),
	  User = require("./models/user"),
	  NewMember = require("./models/newMember"),
	  Shift = require("./models/shift");
	//   methodOverride = require("method-override"),
	//   crypto = require("crypto"),
	//   request = require('request'),
	//   nodemailer = require("nodemailer"), 
	//   schedule = require('node-schedule');

const indexRoutes = require("./routes/index"), 
	  userRoutes = require("./routes/user"),
	  shiftRoutes = require("./routes/shift"),
	  guideRoutes = require("./routes/guide"),
	  adminRoutes = require("./routes/admin"),
	  documentRoutes = require("./routes/document");
// var nodeoutlook = require('nodejs-nodemailer-outlook')


//Add seed data
//seedDB();

// mongoose.connect(process.env.DATABASEURL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
 app.use(express.static(__dirname + "/public"));
// app.use(methodOverride("_method"));
// app.use(flash());

// app.use(require("express-session")({
// 	secret: process.env.SECRET,
// 	resave: false, 
// 	saveUninitialized: false
// }));


// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next) {
// 	// res.locals.currentUser = req.user;
// 	res.locals.error = req.flash("error");
// 	res.locals.success = req.flash("success");
// 	next();
// });

// //=====================
// //NodeMailer 
// //=====================

// let transporter = nodemailer.createTransport({
// 	host: 'smtp.gmail.com',
    // port: 465,
//     secure: true,
//     auth: {
// 		type: 'OAuth2',
// 		user: process.env.MAILUSER,
// 		clientId: process.env.MAILID,
// 		clientSecret: process.env.MAILSECRET,
// 		refreshToken: process.env.MAILREFRESH, 
// 		accessToken: process.env.MAILACCESS
//     }
// });


// //=====================
// //Node-Schedule
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// //=====================

//Find shifts that took place the previous day, get their members and hours, and add the hours to the currentMonth's hours for each member on the shift.
// // var updateCurrentMonth = schedule.scheduleJob('0 0 0 * * *', async function(){
// 	var today = new Date();
// 	var yyyy = today.getFullYear();
// 	var mm = today.getMonth()+1;
// 	var dd = today.getDate();
// 	var todaySet = new Date(yyyy+"/"+mm+"/"+dd);
// 	var todayMS = todaySet.getTime();
// 	var yesterdayMS = todayMS - 86400000;
		
// 	var allShifts = await Shift.find();
// 	allShifts.forEach(async function(shift){
// 		if(shift.startDateMS == yesterdayMS){	
// 			if(shift.type == "es" || shift.type == "dc" || shift.type == "ta"){
// 				if(shift.officerInCharge.name){
// 					await User.findById(shift.officerInCharge._id).then(async function(user){
// 						var durationHours = shift.duration/3600000;
// 						var updatedHours = parseFloat(durationHours.toFixed(2)) + user.hours.currentMonth;
// 						var hoursPush = {
// 							currentMonth: updatedHours,
// 							currentSem: user.hours.currentSem,
// 							semesterTotals: user.hours.semesterTotals,
// 							monthlyTotals: user.hours.monthlyTotals,
// 							totalHours: user.hours.totalHours
// 						}
// 						await User.updateOne({_id: user.id}, {$set:{hours:  hoursPush}}), (function(err){if (err){console.log(err.message)}})
// 					})
// 				}
// 				if(shift.crewChief.name){
// 					await User.findById(shift.crewChief._id).then(async function(user){
// 						var durationHours = shift.duration/3600000;
// 						var updatedHours = parseFloat(durationHours.toFixed(2)) + user.hours.currentMonth;
// 						var hoursPush = {
// 							currentMonth: updatedHours,
// 							currentSem: user.hours.currentSem,
// 							semesterTotals: user.hours.semesterTotals,
// 							monthlyTotals: user.hours.monthlyTotals,
// 							totalHours: user.hours.totalHours
// 						}
// 						await User.updateOne({_id: user.id}, {$set:{hours: hoursPush}}, function(err){if (err){console.log(err.message)}})
// 					})
// 				}
// 				if(shift.crewArray != undefined || shift.crewArray != null || shift.crewArray != 0){
// 					shift.crewArray.forEach(async function(crew){
// 						await User.findById(crew._id).then(async function(user){
// 							var durationHours = shift.duration/3600000;
// 							var updatedHours = parseFloat(durationHours.toFixed(2)) + user.hours.currentMonth;
// 							var hoursPush = {
// 								currentMonth: updatedHours,
// 								currentSem: user.hours.currentSem,
// 								semesterTotals: user.hours.semesterTotals,
// 								monthlyTotals: user.hours.monthlyTotals,
// 								totalHours: user.hours.totalHours
// 							}
// 							await User.updateOne({_id: user.id}, {$set:{hours: hoursPush}}, function(err){if (err){console.log(err.message)}})
// 						})
// 					})
// 				}
// 			}
// 		} 
// 	})
// });

//Send an email reminder to everyone that is supposed to be on the shift
// var sendReminder = schedule.scheduleJob('0 0 8 * * *', async function(){
// 	var today = new Date();
// 	var yyyy = today.getFullYear();
// 	var mm = today.getMonth()+1;
// 	var dd = today.getDate();
// 	var todaySet = new Date(yyyy+"/"+mm+"/"+dd);
// 	var todayMS = todaySet.getTime();
// 	var tomorrowMS = todayMS + 86400000;
	
// 	var shifts = await Shift.find({startDateMS: tomorrowMS});
// 	if(shifts){	
// 		shifts.forEach(async function(shift){
// 			if(shift.type == "es" && shift.status == "scheduled"){
// 				await User.findById(shift.officerInCharge._id).then(async function(user){
// 					if(user){
// 						nodeoutlook.sendEmail({
// 							auth: {
// 								user: process.env.MAILEREMAIL,
// 								pass: process.env.MAILERPASS
// 							},
// 							from: process.env.MAILEREMAIL,
// 							to: `${user.email}`,
// 							replyTo: 'stocktonems-club@go.stockton.edu',
// 							subject: 'Event Standby Reminder',
// 							text:
// 								'Hello!\n\n'
// 								+ "This is a reminder about tomorrow's event standby for "
// 								+ `${shift.shiftName}`
// 								+ '.\n\n'
// 								+ 'The report time is: ' 
// 								+ `${shift.shiftStart.reportTime}`
// 								+ " at "
// 								+ `${shift.reportLocation}`
// 								+ ". This event will take place at/in: "
// 								+ `${shift.shiftLocation}`
// 								+ '. Please see the schedule for more details.\n\n'
// 								+ 'Shift Notes: '
// 								+ '\n'
// 								+ `${shift.notes}`
// 								+ "\n\n"
// 								+ 'Stockton EMS Executive Board Auto-generated Email'
// 								+ '\n\n'
// 								+ process.env.DOMAIN,
// 							onError: (e) => console.log("Error! "+e),
// 							onSuccess: (i) => console.log("Message sent!")
// 						});
// 						// const mailOptions = {
// 						// 	from: process.env.MAILEREMAIL,
// 						// 	to: `${user.email}`,
// 						// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 						// 	subject: 'Event Standby Reminder',
// 						// 	text:
// 						// 		'Hello!\n\n'
// 						// 		+ "This is a reminder about tomorrow's event standby for "
// 						// 		+ `${shift.shiftName}`
// 						// 		+ '.\n\n'
// 						// 		+ 'The report time is: ' 
// 						// 		+ `${shift.shiftStart.reportTime}`
// 						// 		+ " at "
// 						// 		+ `${shift.reportLocation}`
// 						// 		+ ". This event will take place at/in: "
// 						// 		+ `${shift.shiftLocation}`
// 						// 		+ '. Please see the schedule for more details.\n\n'
// 						// 		+ 'Shift Notes: '
// 						// 		+ '\n'
// 						// 		+ `${shift.notes}`
// 						// 		+ "\n\n"
// 						// 		+ 'Stockton EMS Executive Board Auto-generated Email'
// 						// 		+ '\n\n'
// 						// 		+ process.env.DOMAIN, 
// 						// };
// 						// console.log('sending mail');
// 						// transporter.sendMail(mailOptions, function (err) {
// 						// 	if (err) {
// 						// 		console.log(err.message)
// 						// 	} else {
// 						// 		console.log("Email successfully sent!")
// 						// 	}
// 						// });
// 					}
// 				})
// 				await User.findById(shift.crewChief._id).then(async function(user){
// 					if(user){
// 						nodeoutlook.sendEmail({
// 							auth: {
// 								user: process.env.MAILEREMAIL,
// 								pass: process.env.MAILERPASS
// 							},
// 							from: process.env.MAILEREMAIL,
// 							to: `${user.email}`,
// 							replyTo: 'stocktonems-club@go.stockton.edu',
// 							subject: 'Event Standby Reminder',
// 							text:
// 								'Hello!\n\n'
// 								+ "This is a reminder about tomorrow's event standby for "
// 								+ `${shift.shiftName}`
// 								+ '.\n\n'
// 								+ 'The report time is: ' 
// 								+ `${shift.shiftStart.reportTime}`
// 								+ " at "
// 								+ `${shift.reportLocation}`
// 								+ ". This event will take place at/in: "
// 								+ `${shift.shiftLocation}`
// 								+ '. Please see the schedule for more details.\n\n'
// 								+ 'Shift Notes: '
// 								+ '\n'
// 								+ `${shift.notes}`
// 								+ "\n\n"
// 								+ 'Stockton EMS Executive Board Auto-generated Email'
// 								+ '\n\n'
// 								+ process.env.DOMAIN,
// 							onError: (e) => console.log("Error! "+e),
// 							onSuccess: (i) => console.log("Message sent!")
// 						});
// 						// const mailOptions = {
// 						// 	from: process.env.MAILEREMAIL,
// 						// 	to: `${user.email}`,
// 						// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 						// 	subject: 'Event Standby Reminder',
// 						// 	text:
// 						// 		'Hello!\n\n'
// 						// 		+ "This is a reminder about tomorrow's event standby for "
// 						// 		+ `${shift.shiftName}`
// 						// 		+ '.\n\n'
// 						// 		+ 'The report time is: ' 
// 						// 		+ `${shift.shiftStart.reportTime}`
// 						// 		+ " at "
// 						// 		+ `${shift.reportLocation}`
// 						// 		+ ". This event will take place at/in: "
// 						// 		+ `${shift.shiftLocation}`
// 						// 		+ '. Please see the schedule for more details.\n\n'
// 						// 		+ 'Shift Notes: '
// 						// 		+ '\n'
// 						// 		+ `${shift.notes}`
// 						// 		+ "\n\n"
// 						// 		+ 'Stockton EMS Executive Board Auto-generated Email'
// 						// 		+ '\n\n'
// 						// 		+ process.env.DOMAIN, 
// 						// };
// 						// console.log('sending mail');
// 						// transporter.sendMail(mailOptions, function (err) {
// 						// 	if (err) {
// 						// 		console.log(err.message)
// 						// 	} else {
// 						// 		console.log("Email successfully sent!")
// 						// 	}
// 						// });
// 					}
// 				})
// 				await shift.crewArray.forEach(async function(crew){
// 					if(crew){
// 						var user = await User.findById(crew._id);
// 						nodeoutlook.sendEmail({
// 							auth: {
// 								user: process.env.MAILEREMAIL,
// 								pass: process.env.MAILERPASS
// 							},
// 							from: process.env.MAILEREMAIL,
// 							to: `${user.email}`,
// 							replyTo: 'stocktonems-club@go.stockton.edu',
// 							subject: 'Event Standby Reminder',
// 							text:
// 								'Hello!\n\n'
// 								+ "This is a reminder about tomorrow's event standby for "
// 								+ `${shift.shiftName}`
// 								+ '.\n\n'
// 								+ 'The report time is: ' 
// 								+ `${shift.shiftStart.reportTime}`
// 								+ " at "
// 								+ `${shift.reportLocation}`
// 								+ ". This event will take place at/in: "
// 								+ `${shift.shiftLocation}`
// 								+ '. Please see the schedule for more details.\n\n'
// 								+ 'Shift Notes: '
// 								+ '\n'
// 								+ `${shift.notes}`
// 								+ "\n\n"
// 								+ 'Stockton EMS Executive Board Auto-generated Email'
// 								+ '\n\n'
// 								+ process.env.DOMAIN,
// 							onError: (e) => console.log("Error! "+e),
// 							onSuccess: (i) => console.log("Message sent!")
// 						});
// 						// const mailOptions = {
// 						// 	from: process.env.MAILEREMAIL,
// 						// 	to: `${user.email}`,
// 						// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 						// 	subject: 'Event Standby Reminder',
// 						// 	text:
// 						// 		'Hello!\n\n'
// 						// 		+ "This is a reminder about tomorrow's event standby for "
// 						// 		+ `${shift.shiftName}`
// 						// 		+ '.\n\n'
// 						// 		+ 'The report time is: ' 
// 						// 		+ `${shift.shiftStart.reportTime}`
// 						// 		+ " at "
// 						// 		+ `${shift.reportLocation}`
// 						// 		+ ". This event will take place at/in: "
// 						// 		+ `${shift.shiftLocation}`
// 						// 		+ '. Please see the schedule for more details.\n\n'
// 						// 		+ 'Shift Notes: '
// 						// 		+ '\n'
// 						// 		+ `${shift.notes}`
// 						// 		+ "\n\n"
// 						// 		+ 'Stockton EMS Executive Board Auto-generated Email'
// 						// 		+ '\n\n'
// 						// 		+ process.env.DOMAIN, 
// 						// };
// 						// console.log('sending mail');
// 						// transporter.sendMail(mailOptions, function (err) {
// 						// 	if (err) {
// 						// 		console.log(err.message)
// 						// 	} else {
// 						// 		console.log("Email successfully sent!")
// 						// 	}
// 						// });
// 					}
// 				})
// 			} else if(shift.type == "dc" && shift.status == "scheduled"){
// 				if(shift.officerInCharge.name){
// 					await User.findById(shift.officerInCharge._id).then(async function(user){
// 						if(user){
// 							nodeoutlook.sendEmail({
// 								auth: {
// 									user: process.env.MAILEREMAIL,
// 									pass: process.env.MAILERPASS
// 								},
// 								from: process.env.MAILEREMAIL,
// 								to: `${user.email}`,
// 								replyTo: 'stocktonems-club@go.stockton.edu',
// 								subject: 'Duty Crew Reminder',
// 								text:
// 									'Hello!\n\n'
// 									+ "This is a reminder about tomorrow's duty crew. \n\n"
// 									+ 'The report time is: ' 
// 									+ `${shift.shiftStart.reportTime}`
// 									+ " at "
// 									+ `${shift.reportLocation}`
// 									+ ". This duty crew will take place at/in: "
// 									+ `${shift.shiftLocation}`
// 									+ '. Please see the schedule for more details.\n\n'
// 									+ 'Shift Notes: '
// 									+ '\n'
// 									+ `${shift.notes}`
// 									+ "\n\n"
// 									+ 'Stockton EMS Executive Board Auto-generated Email'
// 									+ '\n\n'
// 									+ process.env.DOMAIN,
// 								onError: (e) => console.log("Error! "+e),
// 								onSuccess: (i) => console.log("Message sent!")
// 							});
// 							// const mailOptions = {
// 							// 	from: process.env.MAILEREMAIL,
// 							// 	to: `${user.email}`,
// 							// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 							// 	subject: 'Duty Crew Reminder',
// 							// 	text:
// 							// 		'Hello!\n\n'
// 							// 		+ "This is a reminder about tomorrow's duty crew. \n\n"
// 							// 		+ 'The report time is: ' 
// 							// 		+ `${shift.shiftStart.reportTime}`
// 							// 		+ " at "
// 							// 		+ `${shift.reportLocation}`
// 							// 		+ ". This duty crew will take place at/in: "
// 							// 		+ `${shift.shiftLocation}`
// 							// 		+ '. Please see the schedule for more details.\n\n'
// 							// 		+ 'Shift Notes: '
// 							// 		+ '\n'
// 							// 		+ `${shift.notes}`
// 							// 		+ "\n\n"
// 							// 		+ 'Stockton EMS Executive Board Auto-generated Email'
// 							// 		+ '\n\n'
// 							// 		+ process.env.DOMAIN, 
// 							// };
// 							// console.log('sending mail');
// 							// transporter.sendMail(mailOptions, function (err) {
// 							// 	if (err) {
// 							// 		console.log(err.message)
// 							// 	} else {
// 							// 		console.log("Email successfully sent!")
// 							// 	}
// 							// });
// 						}
// 					})
// 				}
// 				if(shift.crewChief.name){
// 					await User.findById(shift.crewChief._id).then(async function(user){
// 						if(user){
// 							nodeoutlook.sendEmail({
// 								auth: {
// 									user: process.env.MAILEREMAIL,
// 									pass: process.env.MAILERPASS
// 								},
// 								from: process.env.MAILEREMAIL,
// 								to: `${user.email}`,
// 									replyTo: 'stocktonems-club@go.stockton.edu',
// 									subject: 'Duty Crew Reminder',
// 									text:
// 										'Hello!\n\n'
// 										+ "This is a reminder about tomorrow's duty crew. \n\n"
// 										+ 'The report time is: ' 
// 										+ `${shift.shiftStart.reportTime}`
// 										+ " at "
// 										+ `${shift.reportLocation}`
// 										+ ". This duty crew will take place at/in: "
// 										+ `${shift.shiftLocation}`
// 										+ '. Please see the schedule for more details.\n\n'
// 										+ 'Shift Notes: '
// 										+ '\n'
// 										+ `${shift.notes}`
// 										+ "\n\n"
// 										+ 'Stockton EMS Executive Board Auto-generated Email'
// 										+ '\n\n'
// 										+ process.env.DOMAIN,
// 								onError: (e) => console.log("Error! "+e),
// 								onSuccess: (i) => console.log("Message sent!")
// 							});
// 							// const mailOptions = {
// 							// 	from: process.env.MAILEREMAIL,
// 							// 	to: `${user.email}`,
// 							// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 							// 	subject: 'Duty Crew Reminder',
// 							// 	text:
// 							// 		'Hello!\n\n'
// 							// 		+ "This is a reminder about tomorrow's duty crew. \n\n"
// 							// 		+ 'The report time is: ' 
// 							// 		+ `${shift.shiftStart.reportTime}`
// 							// 		+ " at "
// 							// 		+ `${shift.reportLocation}`
// 							// 		+ ". This duty crew will take place at/in: "
// 							// 		+ `${shift.shiftLocation}`
// 							// 		+ '. Please see the schedule for more details.\n\n'
// 							// 		+ 'Shift Notes: '
// 							// 		+ '\n'
// 							// 		+ `${shift.notes}`
// 							// 		+ "\n\n"
// 							// 		+ 'Stockton EMS Executive Board Auto-generated Email'
// 							// 		+ '\n\n'
// 							// 		+ process.env.DOMAIN, 
// 							// };
// 							// console.log('sending mail');
// 							// transporter.sendMail(mailOptions, function (err) {
// 							// 	if (err) {
// 							// 		console.log(err.message)
// 							// 	} else {
// 							// 		console.log("Email successfully sent!")
// 							// 	}
// 							// });
// 							}
// 						}
// 					)
// 				}
// 				if(shift.crewArray != undefined || shift.crewArray != null || shift.crewArray != 0){
// 					shift.crewArray.forEach(async function(crew){
// 						await User.findById(crew._id).then(async function(user){
// 						if(user){
// 							nodeoutlook.sendEmail({
// 							auth: {
// 								user: process.env.MAILEREMAIL,
// 								pass: process.env.MAILERPASS
// 							},
// 							from: process.env.MAILEREMAIL,
// 							to: `${user.email}`,
// 								replyTo: 'stocktonems-club@go.stockton.edu',
// 								subject: 'Duty Crew Reminder',
// 								text:
// 									'Hello!\n\n'
// 									+ "This is a reminder about tomorrow's duty crew. \n\n"
// 									+ 'The report time is: ' 
// 									+ `${shift.shiftStart.reportTime}`
// 									+ " at "
// 									+ `${shift.reportLocation}`
// 									+ ". This duty crew will take place at/in: "
// 									+ `${shift.shiftLocation}`
// 									+ '. Please see the schedule for more details.\n\n'
// 									+ 'Shift Notes: '
// 									+ '\n'
// 									+ `${shift.notes}`
// 									+ "\n\n"
// 									+ "Stockton EMS Executive Board Auto-generated Email"
// 									+ '\n\n'
// 									+ process.env.DOMAIN,
// 							onError: (e) => console.log("Error! "+e),
// 							onSuccess: (i) => console.log("Message sent!")
// 						});
// 							// const mailOptions = {
// 							// 	from: process.env.MAILEREMAIL,
// 							// 	to: `${user.email}`,
// 							// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 							// 	subject: 'Duty Crew Reminder',
// 							// 	text:
// 							// 		'Hello!\n\n'
// 							// 		+ "This is a reminder about tomorrow's duty crew. \n\n"
// 							// 		+ 'The report time is: ' 
// 							// 		+ `${shift.shiftStart.reportTime}`
// 							// 		+ " at "
// 							// 		+ `${shift.reportLocation}`
// 							// 		+ ". This duty crew will take place at/in: "
// 							// 		+ `${shift.shiftLocation}`
// 							// 		+ '. Please see the schedule for more details.\n\n'
// 							// 		+ 'Shift Notes: '
// 							// 		+ '\n'
// 							// 		+ `${shift.notes}`
// 							// 		+ "\n\n"
// 							// 		+ "Stockton EMS Executive Board Auto-generated Email"
// 							// 		+ '\n\n'
// 							// 		+ process.env.DOMAIN, 
// 							// };
// 							// console.log('sending mail');
// 							// transporter.sendMail(mailOptions, function (err) {
// 							// 	if (err) {
// 							// 		console.log(err.message)
// 							// 	} else {
// 							// 		console.log("Email successfully sent!")
// 							// 	}
// 							// });
// 						}
// 						})
// 					})
// 				}
// 			} else if(shift.type == "ta" && shift.status == "scheduled"){
// 				var emailList =[];
// 				if(shift.officerInCharge.name){
// 					await User.findById(shift.officerInCharge._id).then(async function(user){
// 						if(user){
// 							nodeoutlook.sendEmail({
// 							auth: {
// 								user: process.env.MAILEREMAIL,
// 								pass: process.env.MAILERPASS
// 							},
// 							from: process.env.MAILEREMAIL,
// 							to: `${user.email}`,
// 								replyTo: 'stocktonems-club@go.stockton.edu',
// 								subject: 'Tabling Reminder',
// 								text:
// 									'Hello!\n\n'
// 									+ "This is a reminder about tomorrow's tabling event for "
// 									+ `${shift.shiftName}`
// 									+ '.\n\n'
// 									+ 'The report time is: ' 
// 									+ `${shift.shiftStart.reportTime}`
// 									+ ". Please see the schedule for details."
// 									+ '.\n\n'
// 									+ 'Shift Notes: '
// 									+ '\n'
// 									+ `${shift.notes}`
// 									+ "\n\n"
// 									+ 'Stockton EMS Executive Board Auto-generated Email'
// 									+ '\n\n'
// 									+ process.env.DOMAIN,
// 							onError: (e) => console.log("Error! "+e),
// 							onSuccess: (i) => console.log("Message sent!")
// 						});
// 							// const mailOptions = {
// 							// 	from: process.env.MAILEREMAIL,
// 							// 	to: `${user.email}`,
// 							// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 							// 	subject: 'Tabling Reminder',
// 							// 	text:
// 							// 		'Hello!\n\n'
// 							// 		+ "This is a reminder about tomorrow's tabling event for "
// 							// 		+ `${shift.shiftName}`
// 							// 		+ '.\n\n'
// 							// 		+ 'The report time is: ' 
// 							// 		+ `${shift.shiftStart.reportTime}`
// 							// 		+ ". Please see the schedule for details."
// 							// 		+ '.\n\n'
// 							// 		+ 'Shift Notes: '
// 							// 		+ '\n'
// 							// 		+ `${shift.notes}`
// 							// 		+ "\n\n"
// 							// 		+ 'Stockton EMS Executive Board Auto-generated Email'
// 							// 		+ '\n\n'
// 							// 		+ process.env.DOMAIN, 
// 							// };
// 							// console.log('sending mail');
// 							// transporter.sendMail(mailOptions, function (err) {
// 							// 	if (err) {
// 							// 		console.log(err.message)
// 							// 	} else {
// 							// 		console.log("Email successfully sent!")
// 							// 	}
// 							// });
// 						}
// 					})
// 				}
// 				if(shift.crewChief.name){
// 					await User.findById(shift.crewChief._id).then(async function(user){
// 						if(user){
// 							nodeoutlook.sendEmail({
// 							auth: {
// 								user: process.env.MAILEREMAIL,
// 								pass: process.env.MAILERPASS
// 							},
// 							from: process.env.MAILEREMAIL,
// 							to: `${user.email}`,
// 								replyTo: 'stocktonems-club@go.stockton.edu',
// 								subject: 'Tabling Reminder',
// 								text:
// 									'Hello!\n\n'
// 									+ "This is a reminder about tomorrow's tabling event for "
// 									+ `${shift.shiftName}`
// 									+ '.\n\n'
// 									+ 'The report time is: ' 
// 									+ `${shift.shiftStart.reportTime}`
// 									+ ". Please see the schedule for details."
// 									+ '.\n\n'
// 									+ 'Shift Notes: '
// 									+ '\n'
// 									+ `${shift.notes}`
// 									+ "\n\n"
// 									+ 'Stockton EMS Executive Board Auto-generated Email'
// 									+ '\n\n'
// 									+ process.env.DOMAIN,
// 							onError: (e) => console.log("Error! "+e),
// 							onSuccess: (i) => console.log("Message sent!")
// 						});
// 							// const mailOptions = {
// 							// 	from: process.env.MAILEREMAIL,
// 							// 	to: `${user.email}`,
// 							// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 							// 	subject: 'Tabling Reminder',
// 							// 	text:
// 							// 		'Hello!\n\n'
// 							// 		+ "This is a reminder about tomorrow's tabling event for "
// 							// 		+ `${shift.shiftName}`
// 							// 		+ '.\n\n'
// 							// 		+ 'The report time is: ' 
// 							// 		+ `${shift.shiftStart.reportTime}`
// 							// 		+ ". Please see the schedule for details."
// 							// 		+ '.\n\n'
// 							// 		+ 'Shift Notes: '
// 							// 		+ '\n'
// 							// 		+ `${shift.notes}`
// 							// 		+ "\n\n"
// 							// 		+ 'Stockton EMS Executive Board Auto-generated Email'
// 							// 		+ '\n\n'
// 							// 		+ process.env.DOMAIN, 
// 							// };
// 							// console.log('sending mail');
// 							// transporter.sendMail(mailOptions, function (err) {
// 							// 	if (err) {
// 							// 		console.log(err.message)
// 							// 	} else {
// 							// 		console.log("Email successfully sent!")
// 							// 	}
// 							// });
// 						}
// 					})
// 				}
// 				if(shift.crewArray != undefined || shift.crewArray != null || shift.crewArray != 0){
// 					shift.crewArray.forEach(async function(crew){
// 						await User.findById(crew._id).then(async function(user){
// 							if(user){
// 								nodeoutlook.sendEmail({
// 							auth: {
// 								user: process.env.MAILEREMAIL,
// 								pass: process.env.MAILERPASS
// 							},
// 							from: process.env.MAILEREMAIL,
// 							to: `${user.email}`,
// 									replyTo: 'stocktonems-club@go.stockton.edu',
// 									subject: 'Tabling Reminder',
// 									text:
// 										'Hello!\n\n'
// 										+ "This is a reminder about tomorrow's tabling event for "
// 										+ `${shift.shiftName}`
// 										+ '.\n\n'
// 										+ 'The report time is: ' 
// 										+ `${shift.shiftStart.reportTime}`
// 										+ ". Please see the schedule for details."
// 										+ '.\n\n'
// 										+ 'Shift Notes: '
// 										+ '\n'
// 										+ `${shift.notes}`
// 										+ "\n\n"
// 										+ 'Stockton EMS Executive Board Auto-generated Email'
// 										+ '\n\n'
// 										+ process.env.DOMAIN,
// 							onError: (e) => console.log("Error! "+e),
// 							onSuccess: (i) => console.log("Message sent!")
// 						});
// 							// 	const mailOptions = {
// 							// 		from: process.env.MAILEREMAIL,
// 							// 		to: `${user.email}`,
// 							// 		replyTo: 'stocktonems-club@go.stockton.edu',
// 							// 		subject: 'Tabling Reminder',
// 							// 		text:
// 							// 			'Hello!\n\n'
// 							// 			+ "This is a reminder about tomorrow's tabling event for "
// 							// 			+ `${shift.shiftName}`
// 							// 			+ '.\n\n'
// 							// 			+ 'The report time is: ' 
// 							// 			+ `${shift.shiftStart.reportTime}`
// 							// 			+ ". Please see the schedule for details."
// 							// 			+ '.\n\n'
// 							// 			+ 'Shift Notes: '
// 							// 			+ '\n'
// 							// 			+ `${shift.notes}`
// 							// 			+ "\n\n"
// 							// 			+ 'Stockton EMS Executive Board Auto-generated Email'
// 							// 			+ '\n\n'
// 							// 			+ process.env.DOMAIN, 
// 							// 	};
// 							// 	console.log('sending mail');
// 							// 	transporter.sendMail(mailOptions, function (err) {
// 							// 		if (err) {
// 							// 			console.log(err.message)
// 							// 		} else {
// 							// 			console.log("Email successfully sent!")
// 							// 		}
// 							// 	});
// 							 }
// 						})
// 					})
// 				}
// 			} else if(shift.type == "gm" && shift.status == "scheduled"){
// 				await User.find({onRoster: true}).then(function(user){
// 					const sendMail = async function(){
// 						var emailList = []
// 						for(var i = 0; i < user.length; i++){
// 							emailList.push(user[i].email)
// 						}
// 						nodeoutlook.sendEmail({
// 							auth: {
// 								user: process.env.MAILEREMAIL,
// 								pass: process.env.MAILERPASS
// 							},
// 							from: process.env.MAILEREMAIL,
// 							to: `${emailList}`,
// 								replyTo: 'stocktonems-club@go.stockton.edu',
// 								subject: 'General Meeting Reminder',
// 								text:
// 									'Hello!\n\n'
// 									+ "This is a reminder about tomorrow's general meeting.\n\n"
// 									+ 'The report time is: ' 
// 									+ `${shift.shiftStart.reportTime}`
// 									+ ' in '
// 									+ `${shift.shiftLocation}`
// 									+ '. Please see the schedule for more details.\n\n'
// 									+ 'Meeting Notes: '
// 									+ '\n'
// 									+ `${shift.notes}`
// 									+ "\n\n"
// 									+ 'Stockton EMS Executive Board Auto-generated Email'
// 									+ '\n\n'
// 									+ process.env.DOMAIN,
// 							onError: (e) => console.log("Error! "+e),
// 							onSuccess: (i) => console.log("Message sent!")
// 						});
// 						// const mailOptions = {
// 						// 		from: process.env.MAILEREMAIL,
// 						// 		to: `${emailList}`,
// 						// 		replyTo: 'stocktonems-club@go.stockton.edu',
// 						// 		subject: 'General Meeting Reminder',
// 						// 		text:
// 						// 			'Hello!\n\n'
// 						// 			+ "This is a reminder about tomorrow's general meeting.\n\n"
// 						// 			+ 'The report time is: ' 
// 						// 			+ `${shift.shiftStart.reportTime}`
// 						// 			+ ' in '
// 						// 			+ `${shift.shiftLocation}`
// 						// 			+ '. Please see the schedule for more details.\n\n'
// 						// 			+ 'Meeting Notes: '
// 						// 			+ '\n'
// 						// 			+ `${shift.notes}`
// 						// 			+ "\n\n"
// 						// 			+ 'Stockton EMS Executive Board Auto-generated Email'
// 						// 			+ '\n\n'
// 						// 			+ process.env.DOMAIN, 
// 						// 	};
// 						// 	console.log('sending mail');
// 						// 	await transporter.sendMail(mailOptions, function (err) {
// 						// 		if (err) {
// 						// 			console.log("Could not send email: "+err.message)
// 						// 		} else {
// 						// 			console.log("Email successfully sent!")
// 						// 		}
// 						// 	});
// 					}
// 					sendMail();
// 				})
// 			}
// 		})
// 	}
// });

//Saves the currentMonth's hours to the user's monthlyTotals array, adds the currentMonth's hours to the currentSem total, adds the currentMonth's hours to totalHours, and zeroes out the currentMonth value
// var updateMonthlyHours = schedule.scheduleJob('5 0 0 1 * *', async function(){
// 	var today = new Date();
// 	var yyyy = today.getFullYear();
// 	var mm = today.getMonth()+1;
	
// 	var foundUser = await User.find({onRoster:true});
// 	foundUser.forEach(async function(user){
// 		var monthlyTotalPush = {month: mm+"/"+yyyy, hours: user.hours.currentMonth};
// 		await User.updateOne({_id: user.id}, {$addToSet: {monthlyTotals: monthlyTotalPush}});
// 		var hoursPush = {
// 			currentMonth: 0,
// 			currentSem: user.hours.currentSem + user.hours.currentMonth,
// 			totalHours: user.hours.totalHours + user.hours.currentMonth
// 		}
// 		await User.updateOne({_id: user.id}, {$set: {hours: hoursPush}})
// 	});
// }); 

//Save currentSem's total to semesterTotals array and zeroes out the currentSem total
// var updateSemesterHours = schedule.scheduleJob('10 0 0 1 1,7 *', async function(){
// 	// 0,30 * * * *
// 	var today = new Date();
// 	var yyyy = today.getFullYear();
// 	var mm = today.getMonth()+1;
// 	var semester;
// 	if(mm>=7){
// 		semester = "Fall "
// 	} else {
// 		semester = "Spring "
// 	};
	
// 	var foundUser = await User.find({onRoster:true});
// 	foundUser.forEach(async function(user){
// 		var semesterTotalsPush = {semName: semester+yyyy, hours: user.hours.currentSem};
// 		await User.updateOne({_id: user.id}, {$addToSet: {semesterTotals: semesterTotalsPush}});
// 		var hoursPush = {
// 		currentMonth: user.hours.currentMonth,
// 		currentSem: 0,
// 		totalHours: user.hours.totalHours
// 		};
// 		await User.updateOne({_id: user.id}, {$set: {hours: hoursPush}});	
// 	});
// });

// //=====================
// //Routes
// //=====================


app.use(userRoutes);
app.use(documentRoutes);
app.use(shiftRoutes);
app.use(guideRoutes);
app.use(indexRoutes);
app.use(adminRoutes);

//404 Error Route
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('noPage', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

//Use export PORT=3000
app.listen(process.env.PORT, function(){
	console.log("SEMS Member Site has started...");
});