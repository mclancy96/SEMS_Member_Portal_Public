var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Shift = require("../models/shift");
var middleware = require('../middleware');
const nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var nodeoutlook = require('nodejs-nodemailer-outlook')


// //Nodemailer Setup
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
//     }
// });

// router.post("/shift/:id/emailMinutes", async function(req, res){
// 	var today = new Date();
// 	var dd = String(today.getDate()).padStart(2, '0');
// 	var mm = String(today.getMonth() + 1).padStart(2, '0');
// 	var yyyy = today.getFullYear();

// 	today = mm + '-' + dd + '-' + yyyy;
	
// 	var emailList = []; 
	
// 	await User.find({$or:[{status: "Active"},{status: "Probation"},{status: "Training"}]}).then( function(users){
// 		users.forEach(function(user){
// 			emailList.push(user.email)
// 		})
// 		console.log("emailList ="+emailList)
// 	});
	
// 	Shift.findById(req.params.id).then(function(shift){
// 		//Send email with meeting minutes
// 		nodeoutlook.sendEmail({
// 			auth: {
// 				user: process.env.MAILEREMAIL,
// 				pass: process.env.MAILERPASS
// 			},
// 			from: process.env.MAILEREMAIL,
// 			to: `${emailList}`,
// 			replyTo: 'stocktonems-club@go.stockton.edu',
// 			subject: 'Meeting Minutes '+`${shift.shiftStart.startDateReadable}`,
// 			text:
// 				'Hello!\n\n'
// 			+ 'The following are the meeting minutes from our most recent meeting:\n\n'
// 			+ "Captain's Topics:\n"
// 			+ `${shift.meetingMinutes.cptTopics}`
// 			+ '\n\n'
// 			+ "Lieutenant's Topics:\n"
// 			+ `${shift.meetingMinutes.ltTopics}`
// 			+ '\n\n'
// 			+ "Training Sergeant's Topics:\n"
// 			+ `${shift.meetingMinutes.tSgtTopics}`
// 			+ '\n\n'
// 			+ "Supply Sergeant's Topics:\n"
// 			+ `${shift.meetingMinutes.sSgtTopics}`
// 			+ '\n\n'
// 			+ "Advisors' Topics:\n"
// 			+ `${shift.meetingMinutes.advisorTopics}`
// 			+ '\n\n'
// 			+ "Members' Topics:\n"
// 			+ `${shift.meetingMinutes.memberTopics}`
// 			+ '\n\n'
// 			+ '-Stockton EMS Executive Board Auto Generated Email',
// 			onError: (e) => console.log("Error! "+e),
// 			onSuccess: (i) => console.log("Message sent!")
// 		});
// 		// const mailOptions = {
// 		// 	from: process.env.MAILEREMAIL,
// 		// 	to: `${emailList}`,
// 		// 	replyTo: 'stocktonems-club@go.stockton.edu',
// 		// 	subject: 'Meeting Minutes '+`${shift.shiftStart.startDateReadable}`,
// 		// 	text:
// 		// 		'Hello!\n\n'
// 		// 	+ 'The following are the meeting minutes from our most recent meeting:\n\n'
// 		// 	+ "Captain's Topics:\n"
// 		// 	+ `${shift.meetingMinutes.cptTopics}`
// 		// 	+ '\n\n'
// 		// 	+ "Lieutenant's Topics:\n"
// 		// 	+ `${shift.meetingMinutes.ltTopics}`
// 		// 	+ '\n\n'
// 		// 	+ "Training Sergeant's Topics:\n"
// 		// 	+ `${shift.meetingMinutes.tSgtTopics}`
// 		// 	+ '\n\n'
// 		// 	+ "Supply Sergeant's Topics:\n"
// 		// 	+ `${shift.meetingMinutes.sSgtTopics}`
// 		// 	+ '\n\n'
// 		// 	+ "Advisors' Topics:\n"
// 		// 	+ `${shift.meetingMinutes.advisorTopics}`
// 		// 	+ '\n\n'
// 		// 	+ "Members' Topics:\n"
// 		// 	+ `${shift.meetingMinutes.memberTopics}`
// 		// 	+ '\n\n'
// 		// 	+ '-Stockton EMS Executive Board Auto Generated Email'
// 		// };
// 		// console.log('sending mail');
// 		// transporter.sendMail(mailOptions, function (err) {
// 		// 	if (err) {
// 		// 		console.log("Error! " + err.message);
// 		// 	} else {
// 		// 		console.log("Email successfully sent!");
// 		// 	}
// 		// });
// 		req.flash("success", "Minutes sent successfully. Please give at least 10 minutes for the email to send.");
// 		res.redirect("back");
// 	})

// })

router.get("/shift/graveyard", async function(req,res){
	var allShifts = await Shift.find().sort({"startDateMS": -1});
	res.render("./shift/graveyard",{ allShifts:allShifts})
});

//============================================================================Shift CRUD===================================================================================
//New Form
router.get("/shift/new", function(req,res){
	res.render("./shift/new", {});
});

// //Index Route (The Full Schedule)
router.get("/shift", middleware.initializeSchedule, function(req,res){
	var todayDate = new Date();
	var todayMS = Date.now();
	res.locals.formType = "new"
	res.render("./shift/schedule", {allShifts:res.locals.allShifts,  events: res.locals.events, dutyCrews: res.locals.dc, tablings: res.locals.tablings, meetings: res.locals.meetings, socialGatherings: res.locals.socialGatherings, trainings: res.locals.trainings, today: todayDate, todayMS:todayMS, formType:res.locals.formType});
});

// //Create Route
router.post("/shift", middleware.setShiftVariables, function(req,res){
	var shiftName = res.locals.shiftName,
		shiftStart = {
			startDateRaw: req.body.startDate,
			startDateReadable: res.locals.startDateSet,
			reportTime: req.body.reportTime,
			startTime: req.body.startTime,	
			startTimeAndDate: res.locals.startTimeAndDate,
			startTimeAndDateMS: res.locals.startTimeAndDateMS,
		},
		startDateMS= res.locals.startDateMS,
		shiftEnd = {
			endDateRaw: req.body.endDate,
			endDateReadable: res.locals.endDateSet,
			reportTime: req.body.reportTime,
			endTime: req.body.endTime,	
			endTimeAndDate: res.locals.endTimeAndDate,
			endTimeAndDateMS: res.locals.endTimeAndDateMS
		},
		endDateMS= res.locals.endDateMS,
		duration = (shiftEnd.endTimeAndDateMS-shiftStart.startTimeAndDateMS),
		durationReadable = (duration/3600000).toFixed(2) + "hrs",
		type = req.body.shiftTypeSelectorRadios, //Event standby, Duty crew, Tabling, Gen meeting, Meeting, Training, Social Gathering
		shiftHost = req.body.eventHost,
		reportLocation = res.locals.reportLocation,
		shiftLocation = req.body.shiftLocation,
		vehicle = res.locals.vehicle,
		crewMax = res.locals.crewMax,
		notes = res.locals.notes,
		isMandatory = res.locals.isMandatory,
		creator = {
			id: req.user.id,
			name: req.user.name
		};

	var newShift = {
		shiftName: shiftName,
		shiftStart: shiftStart,
		startDateMS: startDateMS,
		shiftEnd: shiftEnd,
		endDateMS: endDateMS,
		duration: duration,
		durationReadable: durationReadable,
		type: type,
		shiftHost: shiftHost,
		reportLocation: reportLocation,
		shiftLocation: shiftLocation,
		vehicle: vehicle,
		crewMax: crewMax,
		notes: notes, 
		isMandatory: isMandatory,
		creator: creator
	}
	
	Shift.create(newShift, function(err, newlyCreatedShift){
		if (err){
			req.flash("error", "Unable to create new shift:" + err.message);
			res.redirect("back");
		} else{
			const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "genMem", message: newlyCreatedShift.shiftName+" has been added to the schedule."});
			notiData.save(function(err, newNoti){});
			req.flash("success", newlyCreatedShift.shiftName+" created successfully!")
			res.redirect("/shift");
		}
	})

});

// //Show Route (Detailed Event Information)
router.get("/shift/:id", function(req,res){
	var todayMS = Date.now();	
	Shift.findById(req.params.id).exec( async function(err, foundShift){
		if (err){
			console.log(err)	
		} else {
			var allMembers = await User.find({$or:[{status: "Active"},{status: "Probation"},{status: "Training"}]}).sort({"lastName": 1})
			res.render("shift/show", {shift: foundShift,  todayMS:todayMS, allMembers:allMembers});
		}
	});
});

//Edit Route
// router.get("/shift/:id/edit", function(req,res){
// 	if(req.isAuthenticated()){
// 		Shift.findById(req.params.id, function(err, foundShift){
// 			res.locals.formType = "edit";
// 			res.render("shift/edit", {shift:foundShift, formType:res.locals.formType});
// 		})
// 	}
// });

//Update Route
// router.put("/shift/:id", middleware.setShiftVariables,function(req,res){
// 	var shiftName = res.locals.shiftName,
// 		shiftStart = {
// 			startDateRaw: req.body.startDate,
// 			startDateReadable: res.locals.startDateSet,
// 			reportTime: req.body.reportTime,
// 			startTime: req.body.startTime,	
// 			startTimeAndDate: res.locals.startTimeAndDate,
// 			startTimeAndDateMS: res.locals.startTimeAndDateMS,
// 		},
// 		startDateMS= res.locals.startDateMS,
// 		shiftEnd = {
// 			endDateRaw: req.body.endDate,
// 			endDateReadable: res.locals.endDateSet,
// 			reportTime: req.body.reportTime,
// 			endTime: req.body.endTime,	
// 			endTimeAndDate: res.locals.endTimeAndDate,
// 			endTimeAndDateMS: res.locals.endTimeAndDateMS
// 		},
// 		endDateMS= res.locals.endDateMS,
// 		duration = (shiftEnd.endTimeAndDateMS-shiftStart.startTimeAndDateMS),
// 		durationReadable = (duration/3600000).toFixed(2) + "hrs",
// 		type = req.body.shiftTypeSelectorRadios, //Event standby, Duty crew, Tabling, Gen meeting, Meeting, Training, Social Gathering
// 		shiftHost = req.body.eventHost,
// 		reportLocation = res.locals.reportLocation,
// 		shiftLocation = req.body.shiftLocation,
// 		vehicle = res.locals.vehicle,
// 		crewMax = res.locals.crewMax,
// 		notes = res.locals.notes,
// 		isMandatory = res.locals.isMandatory,
// 		creator = {
// 			id: req.user.id,
// 			name: req.user.name
// 		}, 
// 		status= req.body.status;

// 	var editedShift = {
// 		shiftName: shiftName,
// 		shiftStart: shiftStart,
// 		startDateMS: startDateMS,
// 		shiftEnd: shiftEnd,
// 		endDateMS: endDateMS,
// 		duration: duration,
// 		durationReadable: durationReadable,
// 		type: type,
// 		shiftHost: shiftHost,
// 		reportLocation: reportLocation,
// 		shiftLocation: shiftLocation,
// 		vehicle: vehicle,
// 		crewMax: crewMax,
// 		notes: notes, 
// 		creator: creator,
// 		status: status
// 	}
// 	Shift.findByIdAndUpdate(req.params.id, editedShift, function(err, updatedShift){
// 		if(err){
// 			req.flash("error", err.message)
// 			res.redirect("/shift");
// 		} else {
// 			const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", message: updatedShift.shiftName+" has been edited."});
// 			notiData.save(function(err, newNoti){});
// 			req.flash("success", "Shift has been updated")
// 			res.redirect("/shift/" + req.params.id);
// 		}
// 	});
// });

//=======================================
//Specific Updates
//=======================================

//Add member to crew
// router.put("/shift/:id/crewAdd", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		if (shift.crewArray == null || shift.crewArray == undefined){
// 			if(req.user.accessLevel == "officer" && req.user.emtCert.certified == true){
// 				if(shift.officerInCharge.name == null || shift.officerInCharge.name == undefined){
// 					var officerPush = {_id: req.user.id, name: req.user.name, title:req.user.title};
// 					await Shift.updateOne({_id: req.params.id}, { $set: { officerInCharge :  officerPush}})
// 					const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", message: req.user.name+" has been added as the officer-in-charge for "+ shift.shiftName});
// 					notiData.save(function(err, newNoti){});
// 					req.flash("success", "You have been added as the officer in charge for this shift")
// 					res.redirect("back");
// 				}
// 			} else if(req.user.title == "Crew Chief" || req.user.accessLevel == "officer"){
// 				console.log("This user is definitely an officer or crew chief")
// 				if(shift.crewChief.name == null || shift.crewChief.name == undefined && shift.officerInCharge.name != req.user.name){
// 					var ccPush = {_id: req.user.id, name: req.user.name, title:req.user.title};
// 					await Shift.updateOne({_id: req.params.id}, { $set: { crewChief :  ccPush}});
// 					const notiDataa = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", message: req.user.name+" has been added as the crew chief for "+ shift.shiftName});
// 					notiDataa.save(function(err, newNoti){});
// 					req.flash("success", "You have been added as the crew chief for this shift")
// 					res.redirect("back");
// 				}
// 			} else if(shift.crewArray.length == 0){
// 				var userPush = {_id: req.user.id, name: req.user.name, title:req.user.title};
// 				await Shift.updateOne({_id: req.params.id}, { $addToSet: { crewArray :  userPush}}, function(err){
// 					if (err) {
// 						console.log(err.message);
// 						req.flash("error", "We couldn't add you to the crew: "+ err.message);
// 						res.redirect("back");
// 					}}
// 				);
// 				req.flash("success", "You have been added to this shift")
// 				res.redirect("back");
// 			}
// 		} else{
// 			if(shift.crewArray.some(arr => arr.name == req.user.name.toString())){
// 				req.flash("error", "You are already signed up for this shift")
// 				req.redirect("back")
// 			} else if (shift.crewArray.length > shift.crewMax){
// 				req.flash("error", "There are already too many people signed up")
// 				req.redirect("back")
// 			} else if(req.user.accessLevel == "officer" && req.user.emtCert.certified == true){
// 				if(shift.officerInCharge.name == null || shift.officerInCharge.name == undefined){
// 					var officerPush = {_id: req.user.id, name: req.user.name, title:req.user.title};
// 					await Shift.updateOne({_id: req.params.id}, { $set: { officerInCharge :  officerPush}})
// 					const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", message: req.user.name+" has been added as the officer-in-charge for "+ shift.shiftName});
// 					notiData.save(function(err, newNoti){});
// 					req.flash("success", "You have been added as the officer in charge for this shift")
// 					res.redirect("back");
// 				}
// 			} else if(req.user.title == "Crew Chief" || req.user.title == "FTO" || req.user.accessLevel == "officer"){
// 				if(shift.crewChief.name == null || shift.crewChief.name == undefined && req.user.emtCert.certified == true && shift.officerInCharge.name != req.user.name){
// 					var ccPush = {_id: req.user.id, name: req.user.name, title:req.user.title};
// 					await Shift.updateOne({_id: req.params.id}, { $set: { crewChief :  ccPush}})
// 					const notiDatac = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", message: req.user.name+" has been added as the crew chief for "+ shift.shiftName});
// 					notiDatac.save(function(err, newNoti){});
// 					req.flash("success", "You have been added as the crew chief for this shift")
// 					res.redirect("back");
// 				} 
// 			} else {
// 				if(shift.crewArray.length < shift.crewMax){
// 					var userPush = {_id: req.user.id, name: req.user.name, title:req.user.title};
// 					await Shift.updateOne({_id: req.params.id}, { $addToSet: { crewArray :  userPush}}, function(err){
// 						if (err) {
// 							console.log(err.message);
// 							req.flash("error", "We couldn't add you to the crew: "+ err.message);
// 							res.redirect("back");
// 						}}
// 					);
// 					req.flash("success", "You have been added to this shift")
// 					res.redirect("back");
// 				} else {
// 					req.flash("error", "This shift is full!");
// 					res.redirect("back");
// 				}
// 			}
// 		}
		
// 	})
// });

//Remove member from crew (done by members themselves)
// router.put("/shift/:id/crewRemove", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		if(shift.crewArray.some(arr => arr.name == req.user.name)){
// 			await shift.crewArray.pull({name: req.user.name})
// 			await shift.save()
// 			req.flash("success", "You have been removed from this shift")
// 			res.redirect("back");
// 		} else if(shift.officerInCharge._id == req.user.id){
// 			var officerPull = {_id: null, name: null, title: null};
// 			await Shift.updateOne({_id: req.params.id}, { $set: { officerInCharge :  officerPull}})
// 			const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance: "high", message: req.user.name+" has been removed as the officer-in-charge for "+ shift.shiftName});
// 			notiData.save(function(err, newNoti){});
// 			req.flash("success", "You have been removed as the officer in charge for this shift")
// 			res.redirect("back");
// 		} else if(shift.crewChief._id == req.user.id){
// 			var ccPull = {_id: null, name: null, title: null};
// 			await Shift.updateOne({_id: req.params.id}, { $set: { crewChief :  ccPull}})
// 			const notiDatab = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance: "high", message: req.user.name+" has been removed as the crew chief for "+ shift.shiftName});
// 			notiDatab.save(function(err, newNoti){});
// 			req.flash("success", "You have been removed as the crew chief for this shift")
// 			res.redirect("back");
// 		} else {
// 			req.flash("error", "You don't appear to be on the shift");
// 			res.redirect("back")
// 		}
// 	})
// })

//Remove member from crew (done by officers)
// router.put("/shift/:shiftId/remove/:userId", middleware.isOfficer, function(req,res){
// 	Shift.findOne({_id: req.params.shiftId}, async function(err, shift){
// 		if(shift.officerInCharge._id == req.params.userId){
// 			var officerPull = {_id: null, name: null, title: null};
// 			await Shift.updateOne({_id: req.params.shiftId}, { $set: { officerInCharge :  officerPull}})
// 			const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance: "high", message: req.user.name+" has been removed as the officer-in-charge for "+ shift.shiftName});
// 			notiData.save(function(err, newNoti){});
// 			req.flash("success", "Member has been removed as the officer in charge for this shift")
// 			res.redirect("back");
// 		} else if(shift.crewChief._id == req.params.userId){
// 			var ccPull = {_id: null, name: null, title: null};
// 			await Shift.updateOne({_id: req.params.shiftId}, { $set: { crewChief :  ccPull}})
// 			const notiDatab = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance: "high", message: req.user.name+" has been removed as the crew chief for "+ shift.shiftName});
// 			notiDatab.save(function(err, newNoti){});
// 			req.flash("success", "Member has been removed as the crew chief for this shift")
// 			res.redirect("back");
// 		} else if(shift.crewArray.some(arr => arr._id == req.params.userId)){
// 			await shift.crewArray.pull({_id: req.params.userId})
// 			await shift.save()
// 			req.flash("success", "Member has been removed from this shift")
// 			res.redirect("back");
// 		} else {
// 			req.flash("error", err.message);
// 			res.redirect("back")
// 		}
// 	})
// })

//Update Status
// router.put("/shift/:id/status", function(req, res){
// 	Shift.findById(req.params.id.toString()).then(async function(shift){	
// 		await Shift.updateOne({_id: req.params.id}, { $set: { status:  req.body.status}})
// 		const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance: "high", message: shift.shiftName+" now has a status of "+ shift.status});
// 		notiData.save(function(err, newNoti){});
// 		req.flash("success", "The status has been updated")
// 		res.redirect("back");
// 	})
// });

//Update Transportation
// router.put("/shift/:id/update/transportation", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var runFormPush = {	transportation: req.body.transportation,
// 			timeAtPD: shift.crewRunForm.timeAtPD,
// 			timeOnLocation: shift.crewRunForm.timeOnLocation,
// 			timeLeaveScene: shift.crewRunForm.timeLeaveScene,
// 			timeLeavePD: shift.crewRunForm.timeLeavePD,
// 			equipmentUsed: shift.crewRunForm.equipmentUsed,
// 			narrative: shift.crewRunForm.narrative};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {crewRunForm: runFormPush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add transportation: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Transportation recorded")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })

//Update atPD
// router.put("/shift/:id/update/atPD", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var runFormPush = {	transportation: shift.crewRunForm.transportation,
// 			timeAtPD: req.body.atPD,
// 			timeOnLocation: shift.crewRunForm.timeOnLocation,
// 			timeLeaveScene: shift.crewRunForm.timeLeaveScene,
// 			timeLeavePD: shift.crewRunForm.timeLeavePD,
// 			equipmentUsed: shift.crewRunForm.equipmentUsed,
// 			narrative: shift.crewRunForm.narrative};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {crewRunForm: runFormPush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add time: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Arrive at PD Recorded")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })	

//Update numPts
// router.put("/shift/:id/update/numPts", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		await Shift.updateOne({_id: req.params.id}, { $set: {numPts:req.body.numPts}}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add Pts: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Number of Pts Recorded")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })	

//Update numPts
// router.put("/shift/:id/update/numPAs", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		await Shift.updateOne({_id: req.params.id}, { $set: {numPAs:req.body.numPAs}}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add PAs: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Number of PAs Recorded")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })	

//Updates onLocation
// router.put("/shift/:id/update/onLocation", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var runFormPush = {	transportation: shift.crewRunForm.transportation,
// 			timeAtPD: shift.crewRunForm.timeAtPD,
// 			timeOnLocation: req.body.onLocation,
// 			timeLeaveScene: shift.crewRunForm.timeLeaveScene,
// 			timeLeavePD: shift.crewRunForm.timeLeavePD,
// 			equipmentUsed: shift.crewRunForm.equipmentUsed,
// 			narrative: shift.crewRunForm.narrative};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {crewRunForm: runFormPush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add time: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "On Location Recorded")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })	


//Updates leaveScene
// router.put("/shift/:id/update/leaveScene", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var runFormPush = {	transportation: shift.crewRunForm.transportation,
// 			timeAtPD: shift.crewRunForm.timeAtPD,
// 			timeOnLocation: shift.crewRunForm.timeOnLocation,
// 			timeLeaveScene: req.body.leaveScene,
// 			timeLeavePD: shift.crewRunForm.timeLeavePD,
// 			equipmentUsed: shift.crewRunForm.equipmentUsed,
// 			narrative: shift.crewRunForm.narrative};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {crewRunForm: runFormPush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add time: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Leave Scene Recorded")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })	

//Updates leavePD
// router.put("/shift/:id/update/leavePD", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var runFormPush = {	transportation: shift.crewRunForm.transportation,
// 			timeAtPD: shift.crewRunForm.timeAtPD,
// 			timeOnLocation: shift.crewRunForm.timeOnLocation,
// 			timeLeaveScene: shift.crewRunForm.timeLeaveScene,
// 			timeLeavePD: req.body.leavePD,
// 			equipmentUsed: shift.crewRunForm.equipmentUsed,
// 			narrative: shift.crewRunForm.narrative};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {crewRunForm: runFormPush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add time: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Leave PD Recorded")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })

//Updates narrative
// router.put("/shift/:id/update/narrative", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var runFormPush = {	transportation: shift.crewRunForm.transportation,
// 			timeAtPD: shift.crewRunForm.timeAtPD,
// 			timeOnLocation: shift.crewRunForm.timeOnLocation,
// 			timeLeaveScene: shift.crewRunForm.timeLeaveScene,
// 			timeLeavePD: shift.crewRunForm.leavePD,
// 			equipmentUsed: shift.crewRunForm.equipmentUsed,
// 			narrative: req.body.narrative};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {crewRunForm: runFormPush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add narrative: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Narrative submitted")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })	

//Updates narrative
// router.put("/shift/:id/update/equipmentUsed", function(req,res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var runFormPush = {	transportation: shift.crewRunForm.transportation,
// 			timeAtPD: shift.crewRunForm.timeAtPD,
// 			timeOnLocation: shift.crewRunForm.timeOnLocation,
// 			timeLeaveScene: shift.crewRunForm.timeLeaveScene,
// 			timeLeavePD: shift.crewRunForm.leavePD,
// 			equipmentUsed: req.body.equipmentUsed,
// 			narrative: shift.crewRunForm.narrative};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {crewRunForm: runFormPush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add equipment used: "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Used equipment submitted")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })

//Update Attendance
// router.put('/shift/:id/update/attendance', async function(req,res){
// 	if(typeof req.body.attendanceEditCheckBoxes == "object"){
// 		await req.body.attendanceCheckBoxes.forEach(function(userId){
// 			User.findById(userId).then(async function(user){
// 				var attendance = {
// 					_id: userId,
// 					name: user.name
// 				}
// 				await Shift.updateOne({_id: req.params.id}, {$push:{"attendedArray": attendance}});
// 			})
// 		});
// 	} else if (typeof req.body.attendanceEditCheckBoxes == "string"){
// 		User.findById(req.body.attendanceCheckBoxes).then(async function(user){
// 			var attendance = {
// 				_id: req.body.attendanceCheckBoxes,
// 				name: user.name
// 			}
// 			await Shift.updateOne({_id: req.params.id}, {$push:{"attendedArray": attendance}});
// 		})
// 	} 
		
// 	req.flash("success", "Attendance successfully submitted!")
// 	res.redirect("back");
// })

//Add to attendedArray
router.put('/shift/:id/update/attendance/add', async function(req,res){
	if(typeof req.body.attendanceEditCheckBoxes == "object"){
		await req.body.attendanceEditCheckBoxes.forEach(function(userId){
			User.findById(userId).then(async function(user){
				var attendance = {
					_id: userId,
					name: user.name
				}
				await Shift.updateOne({_id: req.params.id}, {$push:{"attendedArray": attendance}});
			})
		});
	} else if (typeof req.body.attendanceEditCheckBoxes == "string"){
		User.findById(req.body.attendanceEditCheckBoxes).then(async function(user){
			var attendance = {
				_id: req.body.attendanceEditCheckBoxes,
				name: user.name
			}
			await Shift.updateOne({_id: req.params.id}, {$push:{"attendedArray": attendance}});
		})
	} 
	req.flash("success", "Selected users have been added")
	res.redirect("back");
})

//Pull from attendedArray
// router.put('/shift/:id/update/attendance/remove', function(req,res){
// 	if(typeof req.body.attendancePullCheckBoxes == "object"){
// 		Shift.findById(req.params.id).then(function(shift){
// 			req.body.attendancePullCheckBoxes.forEach(async function(userId){
// 				if(shift.attendedArray.some(arr => arr._id == userId)){
// 					await shift.attendedArrayArray.pull({_id: userId})
// 					await shift.save()
// 				}
// 			})
// 		})
// 	} else if (typeof req.body.attendancePullCheckBoxes == "string"){
// 		Shift.findById(req.params.id).then(async function(shift){
// 			if(shift.attendedArray.some(arr => arr._id == req.body.attendancePullCheckBoxes)){
// 				await shift.attendedArray.pull({_id: req.body.attendancePullCheckBoxes})
// 				await shift.save()
// 			}
// 		})
		
// 	} 
// 	req.flash("success", "Removed selected members")
// 	res.redirect("back");
// })

// meetingMinutes: {
// 		cptTopics: String,
// 		ltTopics: String,
// 		tSgtTopics: String,
// 		sSgtTopics: String,
// 		advisorTopics: String,
// 		memberTopics: String
// 	}, 

//Captain Topics
// router.put("/shift/:id/update/cptTopics", function(req, res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var meetingMinutePush = {	
// 			cptTopics: req.body.cptTopics,
// 			ltTopics: shift.meetingMinutes.ltTopics,
// 			tSgtTopics: shift.meetingMinutes.tSgtTopics,
// 			sSgtTopics: shift.meetingMinutes.sSgtTopics,
// 			advisorTopics: shift.meetingMinutes.advisorTopics,
// 			memberTopics: shift.meetingMinutes.memberTopics,
// 		};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {meetingMinutes: meetingMinutePush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Topics submitted")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })

//Lieutenant Topics
// router.put("/shift/:id/update/ltTopics", function(req, res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var meetingMinutePush = {	
// 			cptTopics: shift.meetingMinutes.cptTopics,
// 			ltTopics: req.body.ltTopics,
// 			tSgtTopics: shift.meetingMinutes.tSgtTopics,
// 			sSgtTopics: shift.meetingMinutes.sSgtTopics,
// 			advisorTopics: shift.meetingMinutes.advisorTopics,
// 			memberTopics: shift.meetingMinutes.memberTopics,
// 		};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {meetingMinutes: meetingMinutePush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Topics submitted")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })

//Training Sergeant Topics
// router.put("/shift/:id/update/tSgtTopics", function(req, res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var meetingMinutePush = {	
// 			cptTopics: shift.meetingMinutes.cptTopics,
// 			ltTopics: shift.meetingMinutes.ltTopics,
// 			tSgtTopics: req.body.tSgtTopics,
// 			sSgtTopics: shift.meetingMinutes.sSgtTopics,
// 			advisorTopics: shift.meetingMinutes.advisorTopics,
// 			memberTopics: shift.meetingMinutes.memberTopics,
// 		};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {meetingMinutes: meetingMinutePush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Topics submitted")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })

//Supply Sergeant Topics
// router.put("/shift/:id/update/sSgtTopics", function(req, res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var meetingMinutePush = {	
// 			cptTopics: shift.meetingMinutes.cptTopics,
// 			ltTopics: shift.meetingMinutes.ltTopics,
// 			tSgtTopics: shift.meetingMinutes.tSgtTopics,
// 			sSgtTopics: req.body.sSgtTopics,
// 			advisorTopics: shift.meetingMinutes.advisorTopics,
// 			memberTopics: shift.meetingMinutes.memberTopics,
// 		};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {meetingMinutes: meetingMinutePush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Topics submitted")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })

//Advisor Topics
// router.put("/shift/:id/update/advisorTopics", function(req, res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var meetingMinutePush = {	
// 			cptTopics: shift.meetingMinutes.cptTopics,
// 			ltTopics: shift.meetingMinutes.ltTopics,
// 			tSgtTopics: shift.meetingMinutes.tSgtTopics,
// 			sSgtTopics: shift.meetingMinutes.sSgtTopics,
// 			advisorTopics: req.body.advisorTopics,
// 			memberTopics: shift.meetingMinutes.memberTopics,
// 		};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {meetingMinutes: meetingMinutePush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Topics submitted")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })

//Member Topics
// router.put("/shift/:id/update/memberTopics", function(req, res){
// 	Shift.findById(req.params.id).then(async function(shift){
// 		var meetingMinutePush = {	
// 			cptTopics: shift.meetingMinutes.cptTopics,
// 			ltTopics: shift.meetingMinutes.ltTopics,
// 			tSgtTopics: shift.meetingMinutes.tSgtTopics,
// 			sSgtTopics: shift.meetingMinutes.sSgtTopics,
// 			advisorTopics: shift.meetingMinutes.advisorTopics,
// 			memberTopics: req.body.memberTopics,
// 		};
		
// 		await Shift.updateOne({_id: req.params.id}, { $set: {meetingMinutes: meetingMinutePush }}, function(err, updatedShift){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Topics submitted")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })
//==================================

//Destroy Shift Route
// router.delete("/shift/:id", function(req,res){
// 	Shift.findByIdAndRemove(req.params.id, (err, shiftRemoved) => {
// 		if (err) {
// 			req.flash("error", err.message)
// 		} else {
// 			const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance: "high", message: shiftRemoved.shiftName+" has been deleted"});
// 			notiData.save(function(err, newNoti){});
// 			req.flash("success", "Shift has been deleted")
// 			res.redirect("/shift");
// 		}
//     })
// });


module.exports = router;