const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	// user_type: {
	// 	type: String,
	// 	required: true
	// },
	email: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
