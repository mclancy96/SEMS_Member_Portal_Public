const middlewareObj = {},
	  User = require("../models/user"),
	  //passport = require('passport'),
	  //mongoose = require("mongoose"),
	  Shift = require("../models/shift"),
	  NewMember = require("../models/newMember");
// var Comment = require("../models/Comment");


// ====================================================================================isLoggedIn======================================================================
// middlewareObj.isLoggedIn = function (req, res, next){
// 	if (req.isAuthenticated() || req.user){
// 		return next();
// 	} else {
// 		//req.flash("error", "You must be logged in to do that")
// 		res.redirect("/login");
// 	}
// };

// ====================================================================================noUser======================================================================
//Check if there's already a user
// middlewareObj.noUser = function(req, res, next){
// 	User.findOne({email: req.body.email}, function(err, foundUser){
// 		if(!foundUser||foundUser==undefined){
// 			return next()
// 		} else {
// 			//req.flash("error", "This email is already associated with a member")
// 			res.redirect("back");
// 		}
// 	})
// };

// ====================================================================================isOfficer======================================================================
// middlewareObj.isOfficer = function (req, res, next){
// 	if (req.isAuthenticated() || req.user){
// 		if (req.user.accessLevel == "officer"){
// 			return next();
// 		} else {
// 			//req.flash("error", "This action requires officer-level access permissions")
// 			res.redirect("back");
// 		}
// 	} else {
// 		//req.flash("error", "You must be logged in to do that")
// 		res.redirect("/login");
// 	}
	
// };

// ====================================================================================idIsCurrentUserOrOfficer======================================================================
//Supposed to check if the user is an officer or the current user has the same id as the page being edited (specifically for editing profile pages)
// middlewareObj.idIsCurrentUserOrOfficer = function(req, res, next){
// 	if(req.user.accessLevel=="officer" || req.params.id == req.user._id) {
// 		return next()
// 	} else {
// 		//req.flash("error", "You don't have permission to do that")
// 		res.redirect("back")
// 	}
// }

// ====================================================================================idIsCurrentUser======================================================================
//Checks if the current user has the same id as the page.
// middlewareObj.idIsCurrentUser = function(req, res, next){
// 	if(req.params.id.equals(req.user._id)) {
// 		return next()
// 	} else {
// 		//req.flash("error", "You don't have permission to do that")
// 	}
// }

// ====================================================================================setMemberVariables======================================================================
// middlewareObj.setMemberVariables = function(req,res,next){
	
// 	var today = new Date();
// 	// console.log("Today is: " + today);
// 	var dd = today.getDate();
// 	// console.log("dd is: " + dd)
// 	var mm = today.getMonth() + 1;
// 	// console.log("mm is: " + mm)
// 	var yyyy = today.getFullYear();
// 	// console.log("yyyy is: " + yyyy)
	
// 	today = yyyy + '-' + mm + '-' + dd ;
	
	
// 	if (req.body.emtRadios == "yes") {
// 		res.locals.titleSet =  'EMT';

// 		res.locals.emtCertifiedSet =  true;
// 	} else {
// 		res.locals.titleSet =  'Non-EMT';
// 		res.locals.emtCertifiedSet =  false;
// 	};
	
// 	if (req.body.cprRadios == "yes") {
// 		res.locals.cprCertifiedSet =  true;
// 	} else {
// 		res.locals.cprCertifiedSet =  false;
// 	};

// 	if (req.body.dlRadios == "yes") {
// 		res.locals.dlCertifiedSet =  true;
// 	} else {
// 		res.locals.dlCertifiedSet =  false;
// 	};
	
// 	if(!req.body.cprExpDate){
// 		res.locals.cprExpDateSet = null;
// 	} else {
// 		var cprExpDate = new Date(req.body.cprExpDate);
// 		var cED= cprExpDate.toISOString();
// 		res.locals.cprExpDateSet = cED.slice(5,7) + "/" + cED.slice(8,10) + "/" + cED.slice(0,4);
// 	}
	
// 	if(!req.body.emtExpDate){
// 		res.locals.emtExpDateSet = null;
// 	} else {
// 		var emtExpDate = new Date(req.body.emtExpDate);
// 		var eED= emtExpDate.toISOString();
// 		res.locals.emtExpDateSet = eED.slice(5,7) + "/" + eED.slice(8,10) + "/" + eED.slice(0,4);
// 	}
	
// 	if (!req.body.dlExpDate){
// 		res.locals.dlExpDateSet = null;
// 	} else{
// 		var dlExpDate = new Date(req.body.dlExpDate);
// 		var dED= dlExpDate.toISOString();
// 		res.locals.dlExpDateSet = dED.slice(5,7) + "/" + dED.slice(8,10) + "/" + dED.slice(0,4);
// 	}
	
// 	if (req.body.uniformRadios == "men"){
// 		res.locals.sexSet =  "Male"; 
// 		res.locals.uniSet =  "Men's"; 
// 	} else { 
// 		res.locals.sexSet =  "Female";
// 		res.locals.uniSet =  "Women's";
// 	};
	
// 	if(mm <= 6){
// 		res.locals.entrySemSet = yyyy+"S"
// 	} else{
// 		res.locals.entrySemSet =  yyyy+"F"
// 	};
	
// 	//Access Level Set
// 	if(req.body.title == "EMT" || req.body.title == "Non-EMT" || res.locals.titleSet == "EMT" || res.locals.titleSet =="Non-EMT"){
// 		res.locals.accessLevelSet = "genMem";
// 	};
	
// 	if(req.body.title == "Crew Chief"){
// 		res.locals.accessLevelSet = "genMem";
// 	};
	
// 	if(req.body.title == "FTO"){
// 		res.locals.accessLevelSet = "genMem";
// 		res.locals.titleAbbr = "FTO"
// 	};
	
// 	if(req.body.title == "Captain" || req.body.title == "Lieutenant" || req.body.title == "Training Sergeant" || req.body.title =="Supply Sergeant" || req.body.title == "Secretary" || req.body.title == "Stockton Advisor" || req.body.title == "GTAS Advisor"){
// 		res.locals.accessLevelSet = "officer";
// 	};
	
// 	//Set res.locals.title
	
// 	res.locals.title = req.body.title;
	
// 	//Sets Roster
// 	if(req.body.status == "Terminated" || req.body.status == "Resigned" || req.body.status == "Graduated" || req.body.status == "Delete" || req.body.status == "Alumni"){
// 		res.locals.onRoster = false;
// 		res.locals.title = "Inactive"
// 	}
	
// 	if(req.body.status == "Active" || req.body.status == "Training" || req.body.status == "Probation"){
// 		res.locals.onRoster = true;
// 	}
	
// 	//Title Abbreviation
// 	if(req.body.title == "Captain"){
// 		res.locals.titleAbbr = "Cpt."
// 	} else if(req.body.title == "Lieutenant"){
// 		res.locals.titleAbbr = "Lt."
// 	} else if(req.body.title == "Training Sergeant"){
// 		res.locals.titleAbbr = "Sgt."
// 	} else if(req.body.title == "Supply Sergeant"){
// 		res.locals.titleAbbr = "Sgt."
// 	} else if(req.body.title == "Secretary"){
// 		res.locals.titleAbbr = "Sec."
// 	}
	
// 	next();
// }

// ====================================================================================notiCount======================================================================
//Unread Notification Counter
// middlewareObj.notiCount = async function(req,res,next){
// 	count = await Notification.countDocuments({"readBy" : {$not: { $in: [req.user.id] }}, $or:[{"accessLevel": req.user.accessLevel},{"accessLevel":"genMem"}]});
// 	res.locals.notiCount = count;
// 	next();
// }

// ====================================================================================setShiftVariables======================================================================
//Sets Shift Variables
// middlewareObj.setShiftVariables = function(req,res,next){
// 	var today = new Date();
// 	// console.log("Today is: " + today);
// 	var dd = today.getDate();
// 	// console.log("dd is: " + dd)
// 	var mm = today.getMonth() + 1;
// 	// console.log("mm is: " + mm)
// 	var yyyy = today.getFullYear();
// 	// console.log("yyyy is: " + yyyy)
	
// 	today = yyyy + '-' + mm + '-' + dd ;
	
	
// 	//ShiftName
// 	if(req.body.shiftTypeSelectorRadios == "es"){
// 		res.locals.shiftName = req.body.eventName;
// 	} else if(req.body.shiftTypeSelectorRadios == "dc"){
// 		res.locals.shiftName = "Duty Crew";
// 	} else if(req.body.shiftTypeSelectorRadios == "ta"){ 
// 		res.locals.shiftName = req.body.tablingName;
// 	} else if(req.body.shiftTypeSelectorRadios == "gm"){
// 		res.locals.shiftName = req.body.genMeetingName;
// 	} else if(req.body.shiftTypeSelectorRadios == "m"){
// 		res.locals.shiftName = req.body.meetingName;
// 	} else if(req.body.shiftTypeSelectorRadios == "tr"){
// 		res.locals.shiftName = req.body.trainingName;
// 	} else if(req.body.shiftTypeSelectorRadios == "sg"){
// 		res.locals.shiftName = req.body.socialGatheringName;
// 	} else {
// 		res.locals.shiftName = null;
// 	}
	
// 	//Report Location
// 	if(req.body.shiftTypeSelectorRadios == "es"){
// 		res.locals.reportLocation = req.body.eventReportLocation;
// 	} else if(req.body.shiftTypeSelectorRadios == "dc"){
// 		res.locals.reportLocation = req.body.dcReportLocation;
// 	} else if(req.body.shiftTypeSelectorRadios == "ta"){ 
// 		res.locals.reportLocation = req.body.tablingReportLocation;
// 	} else {
// 		res.locals.reportLocation = req.body.shiftLocation;
// 	}
	
// 	//Vehicle
// 	if(req.body.shiftTypeSelectorRadios == "es"){
// 		res.locals.vehicle = req.body.eventVehicle;
// 	} else if(req.body.shiftTypeSelectorRadios == "dc"){
// 		res.locals.vehicle = req.body.dcVehicle;
// 	} else {
// 		res.locals.vehicle = "None";
// 	}
	
// 	//Crew Max
// 	if(req.body.shiftTypeSelectorRadios == "es"){
// 		res.locals.crewMax = req.body.eventCrewMax;
// 	} else if(req.body.shiftTypeSelectorRadios == "dc"){
// 		res.locals.crewMax = req.body.dcCrewMax;
// 	} else if(req.body.shiftTypeSelectorRadios == "ta"){ 
// 		res.locals.crewMax = req.body.tablingCrewMax;
// 	} else {
// 		res.locals.crewMax = "0";
// 	}
	
// 	//Notes
// 	if(req.body.shiftTypeSelectorRadios == "es"){
// 		res.locals.notes = req.body.eventNotes;
// 	} else if(req.body.shiftTypeSelectorRadios == "dc"){
// 		res.locals.notes = req.body.dcNotes;
// 	} else if(req.body.shiftTypeSelectorRadios == "ta"){ 
// 		res.locals.notes = req.body.tablingNotes;
// 	} else if(req.body.shiftTypeSelectorRadios == "gm"){
// 		res.locals.notes = req.body.genMeetingNotes;
// 	} else if(req.body.shiftTypeSelectorRadios == "m"){
// 		res.locals.notes = req.body.meetingNotes;
// 	} else if(req.body.shiftTypeSelectorRadios == "tr"){
// 		res.locals.notes = req.body.trainingNotes;
// 	} else if(req.body.shiftTypeSelectorRadios == "sg"){
// 		res.locals.notes = req.body.socialGatheringNotes;
// 	} else {
// 		res.locals.notes = null;
// 	}
	
// 	//Start Date MS 
// 	var startDateMS = new Date(req.body.startDate.replace(/-/g, '\/'));
// 	res.locals.startDateMS = startDateMS.getTime();
	
// 	//Start Date and Time in One variable
	
// 	var startDateLoaf = new Date(req.body.startDate);
// 	var startDateSlice = startDateLoaf.toISOString();
// 	var startYear = startDateSlice.slice(0,4);
// 	var startMonth = startDateSlice.slice(5,7);
// 	var startDay = startDateSlice.slice(8,10);
// 	var startHour = req.body.reportTime.slice(0,2);
// 	var startMinute = req.body.reportTime.slice(3,5);
	
// 	res.locals.startTimeAndDate = new Date(startYear, startMonth, startDay, startHour, startMinute, 0);
// 	res.locals.startTimeAndDateMS = res.locals.startTimeAndDate.getTime();
	
// 	//Readable Start Date
// 	var startDateReadLoaf = new Date(req.body.startDate);
// 		var sDR= startDateReadLoaf.toISOString();
// 		res.locals.startDateSet = sDR.slice(5,7) + "/" + sDR.slice(8,10) + "/" + sDR.slice(0,4);
	
// 	//End Date MS 
// 	var endDateMS = new Date(req.body.endDate.replace(/-/g, '\/'));
// 	res.locals.endDateMS = endDateMS.getTime();

	
// 	//End Date and Time in One Variable
// 	var endDateLoaf = new Date(req.body.endDate);
// 	var endDateSlice = endDateLoaf.toISOString();
// 	var endYear = endDateSlice.slice(0,4);
// 	var endMonth = endDateSlice.slice(5,7);
// 	var endDay = endDateSlice.slice(8,10);
// 	var endHour = req.body.endTime.slice(0,2);
// 	var endMinute = req.body.endTime.slice(4,6);
	
// 	res.locals.endTimeAndDate = new Date(endYear, endMonth, endDay, endHour, endMinute, 0)
// 	res.locals.endTimeAndDateMS = res.locals.endTimeAndDate.getTime();
	
// 	//Readable End Date
// 		var endDateReadLoaf = new Date(req.body.endDate);
// 		var eDR= endDateReadLoaf.toISOString();
// 		res.locals.endDateSet = eDR.slice(5,7) + "/" + eDR.slice(8,10) + "/" + eDR.slice(0,4);
	
// 	//Mandatory
// 	if(req.body.shiftTypeSelectorRadios == "gm" || req.body.mMandatoryCheck == "true" || req.body.trMandatoryCheck == "true"){
// 	   res.locals.isMandatory = true;
// 	} else {
// 		res.locals.isMandatory = false;
// 	}
	
// 	next()
// }

// ====================================================================================initializeSchedule======================================================================
// Determings if logged in 
// middlewareObj.initializeSchedule = async function(req, res, next){
// 	if (req.isAuthenticated() || req.user){
		
// 		var today = new Date();
// 		// console.log("Today is: " + today);
// 		var dd = today.getDate();
// 		// console.log("dd is: " + dd)
// 		var mm = today.getMonth() + 1;
// 		// console.log("mm is: " + mm)
// 		var yyyy = today.getFullYear();
// 		// console.log("yyyy is: " + yyyy)

// 		today = yyyy + '-' + mm + '-' + dd ;
// 		//All shifts in Fall and Spring Semester
					
// 		var januaryOne = new Date(yyyy, 0, 1, 0, 0, 0);
		
// 		var julyOne = new Date(yyyy, 6, 1, 0, 0, 0);

// 		var nextJanuaryOne = new Date(yyyy+1, 0, 1, 0, 0, 0);
		
// 		var januaryOneMS = januaryOne.getTime();
		
// 		var julyOneMS = julyOne.getTime();

// 		var nextJanuaryOneMS = nextJanuaryOne.getTime();
		
// 		if (Date.now() < julyOneMS && Date.now() > januaryOneMS){
// 			//Spring Semester
// 			//All Shifts
// 			var shiftsSpring = await Shift.find({"startDateMS": { $gte: januaryOneMS, $lte: julyOneMS }});
// 			res.locals.allShifts = shiftsSpring;
						
// 			//Events
// 			var eventsSpring = await Shift.find({"type":"es", "startDateMS": { $gte: januaryOneMS, $lte: julyOneMS }});
// 			res.locals.events = eventsSpring;
			
// 			//DC
// 			var dcSpring = await Shift.find({"type":"dc", "startDateMS": { $gte: januaryOneMS, $lte: julyOneMS }});
// 			res.locals.dc = dcSpring;
			
// 			//Meetings
// 			var meetingsSpring = await Shift.find({$or:[{"type":"gm"},{"type":"m"}], "startDateMS": { $gte: januaryOneMS, $lte: julyOneMS }});
// 			res.locals.meetings = meetingsSpring;
			
// 			//Tablings
// 			var tablingsSpring = await Shift.find({"type":"ta", "startDateMS": { $gte: januaryOneMS, $lte: julyOneMS }});
// 			res.locals.tablings = tablingsSpring;
			
// 			//Trainings
// 			var trainingSpring = await Shift.find({"type":"tr","startDateMS": { $gte: januaryOneMS, $lte: julyOneMS }});
// 			res.locals.trainings = trainingSpring;
			
// 			//Social Events
// 			var socialGatheringsSpring = await Shift.find({"type":"sg", "startDateMS": { $gte: januaryOneMS, $lte: julyOneMS }});
// 			res.locals.socialGatherings = socialGatheringsSpring;

// 		} else {
// 			//Fall Semester
			
// 			//All Shifts
// 			var shiftsFall = await Shift.find({"startDateMS": { $gte: julyOneMS, $lte: nextJanuaryOneMS}});
// 			res.locals.allShifts = shiftsFall;
			
// 			//Events
// 			var eventsFall = await Shift.find({"type":"es", "startDateMS": { $gte: julyOneMS, $lte: nextJanuaryOneMS}});
// 			res.locals.events = eventsFall;
			
// 			//DC
// 			var dcFall = await Shift.find({"type":"dc", "startDateMS": { $gte: julyOneMS, $lte: nextJanuaryOneMS}});
// 			res.locals.dc = dcFall;
			
// 			//Meetings
// 			var meetingsFall = await Shift.find({$or:[{"type":"gm"},{"type":"m"}], "startDateMS": { $gte: julyOneMS, $lte: nextJanuaryOneMS}});
// 			res.locals.meetings = meetingsFall;
			
// 			//Tablings
// 			var tablingsFall = await Shift.find({"type":"ta", "startDateMS": { $gte: julyOneMS, $lte: nextJanuaryOneMS}});
// 			res.locals.tablings = tablingsFall;
			
// 			//Trainings
// 			var trainingFall = await Shift.find({"type":"tr", "startDateMS": { $gte: julyOneMS, $lte: nextJanuaryOneMS}});
// 			res.locals.trainings = trainingFall;
			
// 			//Social Events
// 			var socialGatheringsFall = await Shift.find({"type":"sg", "startDateMS": { $gte: julyOneMS, $lte: nextJanuaryOneMS}});
// 			res.locals.socialGatherings = socialGatheringsFall;
// 		}
		
// 		next();
// 	} else {
// 		//req.flash("error", "You must be logged in to do that")
// 		res.redirect("/login");
// 	}
// }


module.exports = middlewareObj;