const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASEURL, {useUnifiedTopology: true, useNewUrlParser: true});

var NotificationSchema = new mongoose.Schema({
	created: Date,
	message: String,
	createdBy: {
		id: String,
		name: String
	}, 
	accessLevel: {type: String, default: "officer"},
	effectedMember: {
		id: String,
		name: String
	},
	expiresAt:{
		type: Date,
		default: Date.now() + 2592000000
	},
	importance: {type: String, default: "low"},
	readBy: []
});


module.exports = mongoose.model("Notification", NotificationSchema);