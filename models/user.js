// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

// mongoose.connect(process.env.DATABASEURL, {useUnifiedTopology: true, useNewUrlParser: true});

// var UserSchema = new mongoose.Schema({
// 	firstName: String, 
// 	lastName: String,
// 	name: String,
// 	title: String,
// 	accessLevel: { type: String, default: "genMem" },
// 	status: { type: String, default: "Training" },
// 	onRoster: { type: Boolean, default: true },
// 	email: String,
// 	username: String,
// 	phoneNum: String,
// 	sex: String,
// 	zNum: String,
// 	entrySem: String,
// 	entryClassStatus: String,
// 	currentClassStatus: String,
// 	heldPositions: [],
// 	hours: {
// 		currentSem: { type: Number, default: 0 },
// 		currentMonth: { type: Number, default: 0 },
// 		totalHours: { type: Number, default: 0 }
// 	},
// 	semesterTotals: [{semName: String, hours: Number}],
// 	monthlyTotals: [{month: String, hours: Number}],
// 	address: {
// 		street: String,
// 		line2: { type: String, default: "" },
// 		city: String,
// 		state: String,
// 		zipCode: String
// 	},
// 	cprCert: {
// 		certified: Boolean,
// 		cprProvider: String,
// 		cprExpDate: Date,
// 		cprExpDateReadable: String
// 	},
// 	emtCert: {
// 		certified: Boolean,
// 		njEmsId: Number,
// 		nremtId: String, 
// 		emtExpDate: Date,
// 		emtExpDateReadable: String
// 	},
// 	driversLicense: {
// 		licensed: Boolean,
// 		dlID: String,
// 		dlState: String, 
// 		dlExpDate: Date,
// 		dlExpDateReadable: String
// 	},
// 	emergContact: {
// 		contactName: String, 
// 		contactRelationship: String,
// 		contactPhoneNum: String
// 	},
// 	uniform: {
// 		sex: String,
// 		shirtSize: String,
// 		hasShirt: { type: Boolean, default: false },
// 		jacketSize: String,
// 		hasJacket: { type: Boolean, default: false }
// 	},
// 	activeMemberTraining:{
// 		amTraining1: String,
// 		amTraining2: String,
// 		amClearing: String,
// 		amCleared: { type: Boolean, default: false }
// 	},
// 	crewChiefTraining:{
// 		ccTraining: String, 
// 		ccClearing: String,
// 		ccCleared: { type: Boolean, default: false }
// 	},
// 	resetPasswordToken: { type: String, default: null},
// 	resetPasswordExpires: {type: Date, default: null},
// 	isAdmin: {type: Boolean, default: false}
// });

// UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", UserSchema);