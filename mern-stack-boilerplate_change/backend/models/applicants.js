const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
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
    institution_name: {
		type: [],
		required: true
    },
    start_year: {
		type: Array,
		required: true
    },
    end_year: {
		type: Array,
		required: false
    },
    list_of_languages: {
		type: [],
		required: true
    },
    rating: {
		type: Number,
        required: true,
        default: 0
	},
	date:{
		type: Date,
		required: false
	}
});

module.exports = Applicant = mongoose.model("applicants", applicantSchema);
