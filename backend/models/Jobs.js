const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	name_recruiter: {
		type: String,
		required: true
	},   
	email_recruiter: {
		type: String,
		required: true
	},
	max_applications: {
		type: Number,
		required: true
	},
	max_positions: {
		type: Number,
		required: true
	},
	number_of_positions_filled: {
		type: Number,
		required: false,
		default: 0
	},
	date_of_posting: {
		type: Date,
		required: false
	},
	deadline_of_application: {
		type: Date,
		required: true
	},
	required_skills: {
		type: String,
		required: true
	},
	type_of_job: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true,
		// default: 0
		// min: 0,
		// max: 7
	},
	salary_per_month: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		required: false,
		default: 0
	},
	rate_count:{
		type:Number,
		default:0,
		required:false,
	},
	status: {
		type: String,
		required: false,
		default: "present"
	}
});

module.exports = Job = mongoose.model("Jobs", JobsSchema);