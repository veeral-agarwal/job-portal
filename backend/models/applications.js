const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Applicationschema = new Schema({  
    job_id:{
        type: String,
        required: false,
    },
    recruiter_email:{
        type: String,
        required: false,
    },
    applicant_email:{
        type: String,
        required: false,
    },
    status:{
        type:String,
        required:false,
        // default: 
    },
    sop:{
        type: String,
        required: false
    },
    date_of_application:{
        type: Date,
        required: false,
        default:Date.now()
    },
    job_salary_per_month:{
        type: Number,
        required: false
    },
    name_recrutier:{
        type:String,
        required:false
    },
    status_of_job:{
        type:String,
        required: false
    },
    job_title:{
        type:String,
        required:false,
    },
    stage_of_application:{
        type:String,
        required:false,
    },
    name_applicant:{
        type:String,
        required:false,
    },
    skills_applicant:{
        type:String,
        required:false,
    },
    education_applicant:{
        type:[],
        required:false,
    },
    applicant_rating:{
        type:Number,
        required:false,
        default:0,
    },
    job_type:{
        type:String,
        required:false,
    },
    date_of_joining:{
        type:Date,
        required:false,
    }
})

module.exports = Application = mongoose.model("applications", Applicationschema);