const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const recruiterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	type: {
		type: String,
        required: true,
        default: "recruiter"
	},
	email: {
		type: String,
		required: true
    },
    contact_number: {
		type: Number,
		required: true
    },
    bio: {
		type: String,
		required: true
    },
	date:{
		type: Date,
		required: false
	}
});

module.exports = Recruiter = mongoose.model("recruiters", recruiterSchema);
