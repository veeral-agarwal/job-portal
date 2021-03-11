const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
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
        default: "applicant"
	},
	email: {
		type: String,
		required: true
    },
    education:{
		type:[],
		required: false
	},
    list_of_languages: {
		type: String,
		required: true
    },
    rating: {
		type: Number,
        required: true,
        default: 0,
	},
	date:{
		type: Date,
		required: false
	},
	image:{
		data:Buffer,
		required:false,
		type:String,
	},
	cv:{
		data:Buffer,
		type:String,
		required:false,
	},
	rate_count:{
		type:Number,
		required:false,
		default:0,
	},
	application_count:{
		type:Number,
		default:0,
		required:false,
	},
});

module.exports = Applicant = mongoose.model("applicants", applicantSchema);