var express = require('express');
var router = express.Router();
// var passport = require('passport');
// var User = require('../models/user');
// const NewMember = require('../models/newMember');
// var middleware = require('../middleware');
// const nodemailer = require('nodemailer');
// const crypto = require("crypto");
// var nodeoutlook = require('nodejs-nodemailer-outlook')




router.get('/user/eboard', async function(req, res) {
	// var officers = await User.find({accessLevel: "officer"});
	res.render('./user/eboard', {});
});

router.get('/user/alumni', async function(req, res) {
	// var alumni = await User.find({status:"Alumni"});
	res.render('./user/alumni',{ });
});

router.get('/user/contact_list',
	 function(req,res){
	// 	User.find({onRoster: true}, function(err, allUsers){
	// 	if(err){
	// 		req.flash("error", err.message)
	// 		res.redirect("back");
	// 	} else {
		res.render('./user/contact_list', {});
	// 	}
	// })
 }
);

router.get("/user/everyMember", function(req, res){ 
	// User.find({}, function(err, allUsers){
	// 	if(err){
	// 		req.flash("error", err.message)
	// 		res.redirect("back");
	// 	} else {
			res.render("./user/everyMember", {})
		}
	// });
	// }
);

router.get("/user/top30", async function(req,res){
	// var topMembers = await User.find({}).sort({"hours.totalHours": -1}).limit(30);
	res.render("./user/top30", {});
});

router.get("/user/hours", async function(req,res){
	// var allMembers = await User.find({onRoster: true}).sort({lastName:-1});
		res.render("./user/hours", {});
});

router.get('/user/alumni',
	function(req, res) {
		res.render('./user/alumni', { });
	}
);

//==============================================================New Member Temporary Account Routes:==========================================================

router.get("/user/add_new_member", function(req, res){
	// NewMember.find({}, function(err, allNewUsers){
	// 	if(err){
	// 		req.flash("error", err.message)
	// 		res.redirect("back");
	// 	} else {
			res.render("./user/add_new_member", {});
// 		}
// 	})
// }
);

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


// router.post("/user/add_new_member", 
// 	async function(req, res){
// 		test = await NewMember.findOne({username: req.body.email})
// 		// console.log(test.email)
// 		if (test != null){
// 			req.flash('error', "This email has already been invited");
// 			res.redirect('back');
// 		} else {
// 			//Saves user into system using new variable created above and creates a hash and salt for the password
// 			const tempPswdSet = crypto.randomBytes(20).toString('hex');
// 			const tempPswd = tempPswdSet;

// 			const newMemberData = new NewMember({email: req.body.email, username: req.body.email, tempPswd: tempPswd});

// 			newMemberData.save(function(err, newUser){
// 				if (err) {

// 				} else {
// 					const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", message: req.body.email+ " has been invited to create a new account. Make sure they check their spam folder"});
// 					notiData.save(function(err, newNoti){});
// 					req.flash('success', req.body.email+ " has been invited to create a new account. Make sure they check their spam folder. The email may take up to 10 minutes to send.");
// 					console.log(newUser.email + " has been invited");
// 					res.redirect('back');

// 					nodeoutlook.sendEmail({
// 						auth: {
// 							user: process.env.MAILEREMAIL,
// 							pass: process.env.MAILERPASS
// 						},
// 						from: process.env.MAILEREMAIL,
// 						to: `${newUser.email}`,
// 						replyTo: 'stocktonems-club@go.stockton.edu',
// 						subject: 'Welcome to Stockton EMS',
// 						text:
// 							'Hello!\n\n'
// 						+ 'You have been invited to create an account on our member portal, stocktonems.org. We use this for all of our operations, and as a member, you will primarily use this for signing up for shifts.\n\n'
// 						+ 'Your temporary password is:\n'
// 						+ `${tempPswd}\n\n`
// 						+ 'The following will take you to the new member email verification login screen:\n\n'
// 						+ `https://www.${process.env.DOMAIN}/user/verify\n\n`
// 						+ 'On that screen, please input this email address and your temporary password. You will then be taken to the New Member Creation page to create your new account. This extra step helps us ensure that only the people intended to create accounts are creating accounts, i.e., new members.\n\n'
// 						+ 'This password and link will only work until you create an account. After that, you can sign in at stocktonems.org/login with your newly created password\n\n'
// 						+ 'If you believe this has been done in error, kindly reply to this email indicating so, and we will correct the action.\n\n'
// 						+ '-Stockton EMS Executive Board',
// 						onError: (e) => console.log("Error! "+e),
// 						onSuccess: (i) => console.log("Message sent!")
// 					});
// 				}}
// 			)
// 		}
		
// 	}
// );

router.get("/user/verify", function(req, res){
	res.render("./verify")
});

// router.post("/user/verify", function(req,res){
// 	NewMember.findOne({username: req.body.email}, function(err, newMember){
// 		if (newMember == undefined){
// 			req.flash("error", "No member found");
// 			res.redirect("back");
// 		} else if (req.body.tempPswd == newMember.tempPswd){
// 			res.locals.emailPass = req.body.email;
// 			res.locals.approvedUser = true;
// 			res.locals.formType = "new";
// 			req.flash("success", "Email validated!");
// 			res.render('./user/new', {newMember:newMember, formType:res.locals.formType});
// 		} else {
// 			req.flash("error", "Password does not match. Please try again");
// 			res.redirect("back");
// 		}
// 	});
// });

// router.delete("/user/add_new_member/:id", function(req, res){
// 	NewMember.findByIdAndRemove(req.params.id, function(err, userRemoved) {
// 		if (err) {
// 			req.flash("error", err.message)
// 			res.redirect("back");
// 		} else {
// 			NewMember.find({}, function(err, allNewUsers){
// 				if(err){
// 					req.flash("error", err.message)
// 					res.redirect("back");
// 				} else {
// 					const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance:"high", message: userRemoved.email + " has been removed from the new member invite list"});
// 					notiData.save(function(err, newNoti){});
// 					console.log(userRemoved.email + " has been removed from the invite list");
// 					req.flash("success", userRemoved.email +" has been removed from the invite list");
// 					res.redirect("back");
// 				}
// 			})
// 		}
// 	});
// })


//==============================================================CRUD for Members============================================================

//New Route
//When a new user is needed to be created, the officer should add their email and press send. This will save the email to an array of approved emails. The new member will get an link emailed to them to register as a new user. This email will then be compared to the array to see if they have been approved to make an account. It should also check that the email isn't already associated with an account. 

//New route for members is part of POST to user/verify because that's the only way I could get it to work.
// router.get("/user/new", function(req,res){
// 	res.render("./user/new", {newMember: {username:"bob@gmail.com", email:"bob@gmail.com"}});
// 	console.log(newMember.email)
// })

//Index Route (this is the roster)
router.get("/user",// 
	function(req,res){
		// User.find({onRoster: true}, function(err, allUsers){
		// if(err){
		// 	req.flash("error", err.message)
		// 	res.redirect("back");
		// } else {
			res.render("./user/roster", {}); 
// 		}
// 	})
// }
);

//Create Route
// router.post('/user', middleware.setMemberVariables, function(req, res) {
// 		//Pulls data from the form and saves to variables
// 		var firstName = req.body.firstName,
// 			lastName = req.body.lastName,
// 			name = firstName + ' ' + lastName,
// 			title = res.locals.titleSet,
// 			email = req.body.email,
// 			phoneNum = req.body.phoneNum,
// 			sex = res.locals.sexSet,
// 			zNum = req.body.zNum,
// 			entrySem = res.locals.entrySemSet,
// 			entryClassStatus = req.body.entryClassStatus,
// 			currentClassStatus = req.body.entryClassStatus,
// 			address = {
// 				street: req.body.address1,
// 				line: req.body.address2,
// 				city: req.body.city,
// 				state: req.body.state,
// 				zipCode: req.body.zipCode
// 			},
// 			cprCert = {
// 				certified: res.locals.cprCertifiedSet,
// 				cprProvider: req.body.cprProvider,
// 				cprExpDate: req.body.cprExpDate,
// 				cprExpDateReadable: res.locals.cprExpDateSet
// 			},
// 			emtCert = {
// 				certified: res.locals.emtCertifiedSet,
// 				njEmsId: req.body.njEmtID,
// 				nremtId: req.body.nremtID,
// 				emtExpDate: req.body.emtExpDate,
// 				emtExpDateReadable: res.locals.emtExpDateSet
// 			},
// 			driversLicense = {
// 				licensed: res.locals.dlCertifiedSet,
// 				dlID: req.body.dlID,
// 				dlState: req.body.dlState,
// 				dlExpDate: req.body.dlExpDate,
// 				dlExpDateReadable: res.locals.dlExpDateSet
// 			},
// 			emergContact = {
// 				contactName: req.body.contactName,
// 				contactRelationship: req.body.contactRelationship,
// 				contactPhoneNum: req.body.contactPhoneNum
// 			},
// 			uniform = {
// 				sex: res.locals.uniSet,
// 				shirtSize: req.body.shirtSize,
// 				jacketSize: req.body.jacketSize
// 			};

// 		//Sets saved data values to a new user schema format
// 		var newUser = {
// 			firstName: firstName,
// 			lastName: lastName,
// 			name: name,
// 			title: title,
// 			email: email,
// 			username: email,
// 			phoneNum: phoneNum,
// 			sex:sex,
// 			entryClassStatus:entryClassStatus,
// 			currentClassStatus:currentClassStatus,
// 			zNum: zNum, 
// 			entrySem: entrySem,
// 			address: address,
// 			cprCert: cprCert,
// 			emtCert: emtCert,
// 			driversLicense: driversLicense,
// 			emergContact: emergContact,
// 			uniform: uniform
// 		};

// 		//Saves user into system using new variable created above and creates a hash and salt for the password
// 		User.register(newUser, req.body.password, function(err, newlyCreatedUser) {
// 			if (err) {
// 				req.flash('error', err.message);
// 				return res.redirect('back');
// 			} else {
// 				const notiData = new Notification({createdBy: {id: newlyCreatedUser.id, name: newlyCreatedUser.name}, effectedMember: {id: newlyCreatedUser.id, name: newlyCreatedUser.name}, created: Date.now(), accessLevel: "officer", message: newlyCreatedUser.name + " has created an account."});
// 				notiData.save(function(err, newNoti){});
// 				req.flash('success', 'Your account has been created. You can now login with your email and password');
// 				console.log(newlyCreatedUser.name + " has been created");
// 				res.redirect('/login');
// 			}
// 		});
	
// 		NewMember.findOneAndRemove({email: req.body.email}, function(err, userRemoved) {
// 			if (err) {
// 				req.flash("error", err.message)
// 				res.redirect("back");
// 			} else {
// 				console.log(userRemoved.email + " has registered as a user. His/her NewMember user is deleted")
// 			}
// 		});
// 	}
// );

//Show Route  (The user's profile page)
router.get('/user/:id', //middleware.idIsCurrentUserOrOfficer,
	function(req, res) {
	
	// var todayRaw = Date.now()
	// var today = new Date();
	// var dd = String(today.getDate()).padStart(2, '0');
	// var mm = String(today.getMonth() + 1).padStart(2, '0');
	// var yyyy = today.getFullYear();

	// today = yyyy + '-' + mm + '-' + dd;
	// User.findById(req.params.id).exec( function(err, foundUser){
	// if (err){
	// 	req.flash("error", err.message)
	// 	res.redirect("back")
	// } else {
		res.render("./user/show", {})
// 	}
// 	})
// }
);

//Edit Route
// router.get('/user/:id/edit', //middleware.idIsCurrentUserOrOfficer,
// 	function(req, res) {
// 		if(req.isAuthenticated()){
// 		User.findById(req.params.id, function(err, foundUser){
// 	if (err){
// 		req.flash("error", err.message);
// 		res.redirect("./noPage");
// 	} else {
// 		if(!foundUser.cprCert.cprExpDate){
// 			res.locals.cprExpDateSet = null;
// 		} else {
// 			var cprExpDate = new Date(foundUser.cprCert.cprExpDate);
// 			var cED= cprExpDate.toISOString();
// 			var cprExpDateSet = cED.slice(0,4) + "-" + cED.slice(5,7) + "-" + cED.slice(8,10);
// 		}
		
// 		if(!foundUser.emtCert.emtExpDate){
// 			res.locals.emtExpDateSet = null;
// 		} else {
// 			var emtExpDate = new Date(foundUser.emtCert.emtExpDate);
// 			var eED= emtExpDate.toISOString();
// 			var emtExpDateSet = eED.slice(0,4) + "-" + eED.slice(5,7) + "-" + eED.slice(8,10);
// 		}
		
// 		if(!foundUser.driversLicense.dlExpDate){
// 			res.locals.dlExpDateSet = null;
// 		} else {
// 			var dlExpDate = new Date(foundUser.driversLicense.dlExpDate);
// 			var lED= dlExpDate.toISOString();
// 			var dlExpDateSet = lED.slice(0,4) + "-" + lED.slice(5,7) + "-" + lED.slice(8,10);
// 		}
// 		res.locals.formType = "edit"
// 		res.render("./user/edit", {user:foundUser,  cprExpDateSet:cprExpDateSet, emtExpDateSet:emtExpDateSet, dlExpDateSet:dlExpDateSet, formType:res.locals.formType})
// 	}});
// }
// });

//Update Route
// router.put("/user/:id", middleware.isLoggedIn, middleware.setMemberVariables, function(req, res){
// 	//Pulls data from the form and saves to variables
// 	var today = new Date();
// 	var dd = String(today.getDate()).padStart(2, '0');
// 	var mm = String(today.getMonth() + 1).padStart(2, '0');
// 	var yyyy = today.getFullYear();

// 	today = yyyy + '-' + mm + '-' + dd;
	
// 	User.findById(req.params.id, function(err, foundUser){
// 		if (err){
// 			req.flash("error", "User not found")
// 			res.redirect("back");
// 		} else if(foundUser.isAdmin && req.user._id != req.params.id){
// 			req.flash("error", "User is an admin and cannot be edited")
// 			res.redirect("back");
// 		}else{
// 			var userTitle = foundUser.title;

// 			var userStatus = foundUser.status;	

// 			var firstName = req.body.firstName,
// 				lastName = req.body.lastName,
// 				name = firstName + ' ' + lastName,
// 				title = res.locals.title,
// 				email = req.body.email,
// 				phoneNum = req.body.phoneNum,
// 				accessLevel = res.locals.accessLevelSet,
// 				sex = res.locals.sexSet,
// 				zNum = req.body.zNum,
// 				status = req.body.status,
// 				currentClassStatus = req.body.currentClassStatus,
// 				onRoster = res.locals.onRoster,
// 				address = {
// 					street: req.body.address1,
// 					line2: req.body.address2,
// 					city: req.body.city,
// 					state: req.body.state,
// 					zipCode: req.body.zipCode
// 				},
// 				cprCert = {
// 					certified: res.locals.cprCertifiedSet,
// 					cprProvider: req.body.cprProvider,
// 					cprExpDate: req.body.cprExpDate,
// 					cprExpDateReadable: res.locals.cprExpDateSet
// 				},
// 				emtCert = {
// 					certified: res.locals.emtCertifiedSet,
// 					njEmsId: req.body.njEmtID,
// 					nremtId: req.body.nremtID,
// 					emtExpDate: req.body.emtExpDate,
// 					emtExpDateReadable: res.locals.emtExpDateSet
// 				},
// 				driversLicense = {
// 					licensed: res.locals.dlCertifiedSet,
// 					dlID: req.body.dlID,
// 					dlState: req.body.dlState,
// 					dlExpDate: req.body.dlExpDate,
// 					dlExpDateReadable: res.locals.dlExpDateSet
// 				},
// 				emergContact = {
// 					contactName: req.body.contactName,
// 					contactRelationship: req.body.contactRelationship,
// 					contactPhoneNum: req.body.contactPhoneNum
// 				},
// 				uniform = {
// 					sex: res.locals.uniSet,
// 					shirtSize: req.body.shirtSize,
// 					jacketSize: req.body.jacketSize
// 				};

// 			//Sets saved data values to a user schema format
// 			var updatedData = {
// 				firstName: firstName,
// 				lastName: lastName,
// 				name: name,
// 				title: title,
// 				status: status,
// 				email: email,
// 				username: email,
// 				phoneNum: phoneNum,
// 				accessLevel: accessLevel,
// 				onRoster: onRoster,
// 				sex:sex,
// 				currentClassStatus: currentClassStatus,
// 				zNum: zNum, 
// 				address: address,
// 				cprCert: cprCert,
// 				emtCert: emtCert,
// 				driversLicense: driversLicense,
// 				emergContact: emergContact,
// 				uniform: uniform
// 			};
// 			User.findByIdAndUpdate(req.params.id, updatedData, async function(err, updatedUser){
// 				if(err){
// 					req.flash("error", "You don't have permission to edit this member")
// 					res.redirect("./user/", { });
// 				} else {
// 					if(updatedData.status != userStatus){
// 						const notiDataStat = new Notification({createdBy: {id: req.user.id, name: req.user.name}, effectedMember: {id: foundUser.id, name: foundUser.name}, created: Date.now(), accessLevel: "officer", importance: "high", message: updatedData.name + " now has a status of " + updatedData.status});
// 						notiDataStat.save(function(err, newNoti){});
// 					} else if (updatedData.title != userTitle){
// 						const notiDataTitle = new Notification({createdBy: {id: req.user.id, name: req.user.name}, effectedMember: {id: foundUser.id, name: foundUser.name}, created: Date.now(), accessLevel: "officer", importance: "high", message: updatedData.name + " now has a title of " + updatedData.title});
// 						notiDataTitle.save(function(err, newNoti){});
// 						if(foundUser.heldPositions.some(arr => arr != updatedData.title)){
// 							if(Date.now < new Date(yyyy, 6, 1, 0, 0, 0).getTime()){
// 								await User.updateOne({_id: req.params.id}, { $addToSet: { heldPositions :  updatedData.title + " " + " S"+yyyy}})
// 							} else {
// 								await User.updateOne({_id: req.params.id}, { $addToSet: { heldPositions :  updatedData.title + " " + " F"+yyyy}})
// 							}
// 						}	
// 					}
// 					const notiDataUpdate = new Notification({createdBy: {id: req.user.id, name: req.user.name}, effectedMember: {id: foundUser.id, name: foundUser.name}, created: Date.now(), accessLevel: "officer", message: updatedUser.name + " has been updated"});
// 					notiDataUpdate.save();
// 					req.flash("success", "User has been updated successfully")
// 					res.redirect("/user/"+req.params.id);
// 				}
// 			});
// 		}
// 	}
// )});

//=======================================
//Specific Update Routes
//=======================================

//Update Active Member Training Date 1
// router.put("/user/:id/update/amtd1", middleware.isLoggedIn, function(req,res){
// 	User.findById(req.params.id).then(async function(user){
// 		var amtd1ReadLoaf = new Date(req.body.amtd1);
// 		var sDR= amtd1ReadLoaf.toISOString();
// 		var date1Readable = sDR.slice(5,7) + "/" + sDR.slice(8,10) + "/" + sDR.slice(0,4);
		
// 		var datePush1 = {amTraining1: date1Readable, amTraining2: user.activeMemberTraining.amTraining2, amClearing:user.activeMemberTraining.amClearing, amCleared: user.activeMemberTraining.amCleared};
		
// 		await User.updateOne({_id: req.params.id}, { $set: {activeMemberTraining: datePush1 }}, function(err, foundUser){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Date added")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })
//Update Active Member Training Date 2
// router.put("/user/:id/update/amtd2", middleware.isLoggedIn, function(req,res){
// 	User.findById(req.params.id).then(async function(user){
// 		var amtd2ReadLoaf = new Date(req.body.amtd2);
// 		var sDR= amtd2ReadLoaf.toISOString();
// 		var date2Readable = sDR.slice(5,7) + "/" + sDR.slice(8,10) + "/" + sDR.slice(0,4);
		
// 		var datePush2 = {amTraining1: user.activeMemberTraining.amTraining1, amTraining2: date2Readable, amClearing:user.activeMemberTraining.amClearing, amCleared: user.activeMemberTraining.amCleared};
		
// 		await User.updateOne({_id: req.params.id}, { $set: {activeMemberTraining: datePush2 }}, function(err, foundUser){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Date added")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })
//Update Active Member Clearing Date
// router.put("/user/:id/update/amcd", middleware.isLoggedIn, function(req,res){
// 	User.findById(req.params.id).then(async function(user){
// 		var amcdReadLoaf = new Date(req.body.amcd);
// 		var sDR= amcdReadLoaf.toISOString();
// 		var dateReadable = sDR.slice(5,7) + "/" + sDR.slice(8,10) + "/" + sDR.slice(0,4);
		
// 		var datePush = {amTraining1: user.activeMemberTraining.amTraining1, amTraining2: user.activeMemberTraining.amTraining2, amClearing: dateReadable, amCleared: true};
		
// 		await User.updateOne({_id: req.params.id}, { $set: {activeMemberTraining: datePush }}, function(err, foundUser){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Date added")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })
//Update Crew Chief Training Date
// router.put("/user/:id/update/cctd", middleware.isLoggedIn, function(req,res){
// 	User.findById(req.params.id).then(async function(user){
// 		var amtd1ReadLoaf = new Date(req.body.cctd);
// 		var sDR= amtd1ReadLoaf.toISOString();
// 		var date1Readable = sDR.slice(5,7) + "/" + sDR.slice(8,10) + "/" + sDR.slice(0,4);
		
// 		var datePush = {ccTraining: date1Readable, cclearing:user.crewChiefTraining.ccClearing, ccCleared: user.crewChiefTraining.ccCleared};
		
// 		await User.updateOne({_id: req.params.id}, { $set: {crewChiefTraining: datePush }}, function(err, foundUser){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Date added")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })
//Update Crew Chief Clearing Date
// router.put("/user/:id/update/cccd", middleware.isLoggedIn, function(req,res){
// 	User.findById(req.params.id).then(async function(user){
// 		var amtd1ReadLoaf = new Date(req.body.cccd);
// 		var sDR= amtd1ReadLoaf.toISOString();
// 		var date1Readable = sDR.slice(5,7) + "/" + sDR.slice(8,10) + "/" + sDR.slice(0,4);
		
// 		var datePush = {ccTraining: user.crewChiefTraining.ccTraining, ccClearing: date1Readable, ccCleared: true};
		
// 		await User.updateOne({_id: req.params.id}, { $set: {crewChiefTraining: datePush }}, function(err, foundUser){
// 			if(err){
// 				req.flash("error", "Could not add date "+err.message)
// 				res.redirect("back");
// 			} else {
// 				req.flash("success", "Date added")
// 				res.redirect("back");
// 			}	
// 		})
// 	})
// })


//=======================================

//Destroy Route
// router.delete('/user/:id', middleware.isLoggedIn, //
// 	function(req, res) {
// 	User.findById(req.params.id, function(err, foundUser){
// 		if(foundUser.status = "Delete"){
// 			User.findByIdAndRemove(req.params.id, function (err, userRemoved) {
// 				if (err) {
// 					req.flash("error", err.message)
// 					res.redirect("./user/" + req.params.id, { });
// 				} else {
// 					const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance:"high", message: userRemoved.name + " has been deleted"});
// 					notiData.save(function(err, newNoti){});
// 					req.flash("success", "User has been deleted");
// 					console.log(userRemoved + " has been deleted");
// 					res.redirect("./user/", { });
// 				}
// 			});
// 		} else {
// 			const notiData = new Notification({createdBy: {id: req.user.id, name: req.user.name}, created: Date.now(), accessLevel: "officer", importance:"high", message: req.user.name + " has attempted to delete " + foundUser.name});
// 			notiData.save(function(err, newNoti){});
// 			req.flash("error", "You cannot delete this user until you change the user's status")
// 			res.redirect("./user/" + req.params.id, { });
// 		}
// 	});
// });

module.exports = router;