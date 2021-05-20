var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
const Application  = require("../models/applications");
const { route } = require("./application");

router.get("/s", function(req, res) {
	res.send("API is working properly !");
});
// add an application by applicant
router.post("/addapplication",(req,res) => {
    var lol = new Application({
        job_id: req.body.job_id,
        recruiter_email: req.body.email_recruiter,
        applicant_email: req.body.applicant_email,
        status: req.body.status,
        sop: req.body.sop,
        date_of_application: Date.now(),
        name_recruiter: req.body.name_recruiter,
        job_salary_per_month: req.body.job_salary_per_month,
        status_of_job: req.body.status_of_job,
        job_title: req.body.job_title,
        name_applicant: req.body.name_applicant,
        skills_applicant: req.body.skills,
        education_applicant: req.body.education,
        job_type: req.body.job_type,
        applicant_rating:req.body.rating
    });
    lol.save()
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
    var query = { _id: req.body.job_id };
    set = { $inc: { number_of_positions_filled: 1 } };
    Job.updateOne(query , set , function(err , resp){
        if(err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

//check if an application is present or not
router.post("/app_p_or_n",(req,res)=>{
    Application.find( { "applicant_email":req.body.applicant_email,"job_id":req.body.id } ).then(app=> {
        console.log("yes");
        console.log(req.body)
        res.json(app); //get applicant ids from it
        console.log(app.status)
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

//all applied job by an perticular applicant
router.post("/all_applied_jobs",(req,res)=>{
    Application.find( { "applicant_email":req.body.applicant_email} ).then(app=> {
        console.log("yes");
        res.send(app) //get applicant ids from it
        console.log(app.status)
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

//all selected employees by a perticular recruiter
router.post("/all_my_employees",(req,res)=>{
    Application.find({recruiter_email: req.body.email_rec,  status: "accepted" } ).then(app=> {
        console.log("yes");
        res.send(app) //get applicant ids from it
        console.log(app.status)
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

// getting all the applications 
router.get("/allapplications", function(req, res) {
    Application.find(function(err, applications) {
		if (err) {
			console.log(err);
		} else {
			res.json(applications);
		}
	})
});

//all the applications of a perticular applicant
router.post("/all_my_applications", function(req, res) {
    Application.find( {"applicant_email":req.body.email_rec} ,function(err, applications) {
		if (err) {
			console.log(err);
		} else {
			res.json(applications);
		}
	})
});

// getting all non rejected applications posted by a perticular recruiter
router.post("/all_my_non-rejected_applications_of_perticular_job", function(req, res) {
    Application.find( { $and: [{  recruiter_email:req.body.email_recruiter}, {job_id: req.body.id} ,{ $or: [   {status:  "applied"} ,{ status: "shortlisted" },{ status: "accepted" }  ] }]}    ,function(err, applications) {
		if (err) {
			console.log(err);
		} else {
			res.json(applications);
		}
	})
});

//accept an application by id
router.post("/accept_an_application",(req,res) => {
    var id = req.body.id;
    console.log(req.body);
    var query = { _id: id };
    var set = { $set: { status: "accepted" } };
    Application.updateMany(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        Application.findOne(query ).then( (respon) => {
            console.log(respon);
            var gg = respon.applicant_email;
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'job.dalaaaliii@gmail.com',
                pass: 'veeral veeral'
            }
            });
            var mailOptions = {
            from: 'job.dalaaaliii@gmail.com',
            to: gg,
            subject: 'application accepted',
            text: 'wow bhaiya ;)'
            };
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent');
            }
            })  
        })
    })
});

//reject an application by id
router.post("/reject_an_application",(req,res) => {
    var id = req.body.id;
    var query = { _id: id };
    var set = { $set: { status: "rejected" } };
    Application.updateMany(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

//shortlist an application by id 
router.post("/shortlist_an_application",(req,res) => {
    var id = req.body.id;
    var query = { _id: id };
    var set = { $set: { status: "shortlisted" } };
    Application.updateMany(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

module.exports = router;