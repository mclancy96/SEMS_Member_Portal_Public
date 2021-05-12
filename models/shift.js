// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

// mongoose.connect(process.env.DATABASEURL, {useUnifiedTopology: true, useNewUrlParser: true});

// var ShiftSchema = new mongoose.Schema({
// 	shiftStart: {
// 		startDateRaw: Date,
// 		startDateReadable: String,
// 		reportTime: String,
// 		startTime: String,
// 		startTimeAndDate: Date,
// 		startTimeAndDateMS: Number,
// 	},
// 	startDateMS: {type: Number},
// 	shiftEnd: {
// 		endDateRaw: Date,
// 		endDateReadable: String,
// 		endTime: String,
// 		endTimeAndDate: Date,
// 		endTimeAndDateMS: Number
// 	},
// 	endDateMS: Number,
// 	status: {type:String, default:"scheduled"}, //cancelled, staffed, unstaffed, scheduled
// 	duration: Number,
// 	durationReadable: String,
// 	type: String, //Event standby, Duty crew, Tabling, Gen meeting, Meeting, Training, Social Gathering
// 	shiftName: String,
// 	shiftHost: String,
// 	reportLocation: String,
// 	shiftLocation: String,
// 	vehicle: String,
// 	officerInCharge: {
// 		_id: String,
// 		name: String,
// 		title: String, 
// 		titleAbbr: String
// 	},
// 	crewChief: {
// 		_id: String,
// 		name: String,
// 		title: String, 
// 		titleAbbr: String
// 	},
// 	crewMax: {type: Number, default: 5},
// 	crewArray: [{
// 		_id: String,
// 		name: String,
// 		title: String, 
// 		titleAbbr: String
// 	}],
// 	invitedArray: [{
// 		_id: String,
// 		name: String,
// 		title: String
// 	}],
// 	attendedArray: [{
// 		_id: String,
// 		name: String
// 	}],
// 	numPts: Number,
// 	numPAs: Number,
// 	notes: String,
// 	crewRunForm: {
// 		location: String,
// 		date: Date,
// 		transportation: String,
// 		timeAtPD: String,
// 		timeOnLocation: String,
// 		timeLeaveScene: String,
// 		timeLeavePD: String,
// 		equipmentUsed: String,
// 		narrative: {type:String, default: null}
// 	}, 
// 	isMandatory: {type: Boolean, default: false},
// 	meetingMinutes: {
// 		cptTopics: String,
// 		ltTopics: String,
// 		tSgtTopics: String,
// 		sSgtTopics: String,
// 		advisorTopics: String,
// 		memberTopics: String
// 	}, 
// 	creator: {
// 		id: String,
// 		name: String
// 	}
// });


// module.exports = mongoose.model("Shift", ShiftSchema);