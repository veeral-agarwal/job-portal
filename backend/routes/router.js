var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Recruiter = require("../models/recruiters");
const Applicant = require("../models/applicants");
const Job = require("../models/Jobs");
const Application  = require("../models/applications");

// GET request 
// Getting all the users
router.get("/user", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// GET request 
// Getting all the applicants
router.get("/applicant", function(req, res) {
    Applicant.find(function(err, applicants) {
		if (err) {
			console.log(err);
		} else {
			res.json(applicants);
		}
	})
});

// get a applicant by his email
router.post("/get_an_applicant_by_email",(req,res) => {
    var email = req.body.applicant_ka_email;
    var query = { email: email };
    // var set = { $set: { status: "deleted" } };
    Applicant.findOne(query, function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

// GET request 
// Getting all the recruiters
router.get("/recruiter", function(req, res) {
    Recruiter.find(function(err, recruiters) {
		if (err) {
			console.log(err);
		} else {
			res.json(recruiters);
		}
	})
});

// get a recruiter by his email
router.post("/get_a_recruiter_by_email",(req,res) => {
    var email = req.body.email;
    var query = { email: email };
    // var set = { $set: { status: "deleted" } };
    Recruiter.findOne(query, function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/user/add", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        date: req.body.date
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Add a applicant to db
router.post("/applicant/add", (req, res) => {
    const newApplicant = new Applicant({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        date: req.body.date,
        list_of_languages: req.body.list_of_languages,
        education: req.body.education,
        image: req.body.image,
        cv:req.body.cv
    });

    newApplicant.save()
        .then(applicant => {
            res.status(200).json(applicant);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Add a recruiter to db
router.post("/recruiter/add", (req, res) => {
    const newRecruiter = new Recruiter({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        date: req.body.date,
        bio: req.body.bio_recruiter,
        contact_number: req.body.contact_number,
    });

    newRecruiter.save()
        .then(recruiter => {
            res.status(200).json(recruiter);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

//edit recruiter profile
router.post('/edit_recruiter_profile', (req, res) => {
    console.log(req);
    var query = {email:req.body.email };
    var set = { $set:{
        bio: req.body.bio,
        contact_number: req.body.contact_number,       
        name: req.body.name,          
    }}
    Recruiter.updateOne(query , set, function(err, resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    });    
});

//edit applicant's profile
router.post('/edit_applicant_profile', (req, res) => {
    console.log(req);
    var query = {email:req.body.email };
    var set = { $set:{
        name: req.body.name,
        list_of_languages: req.body.list_of_languages,
        education: req.body.education,
        image: req.body.image,
        cv:req.body.cv
    }}
    Applicant.updateOne(query , set, function(err, resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.status(200).json(user);
            console.log(user);
            return user;
        }
	});
});

// rate an applicant by recruiter
router.post("/rate_applicant_by_recruiter",(req,res) => {
    var email = req.body.email;
    var query = { email: email };
    var set = { $inc: { rate_count: 1 } };
    Applicant.updateOne(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        var sett = { $divide: [ { $inc: {rating: req.body.value} } , resp.data.rate_count ]};
        Applicant.updateOne(query , sett , function(err,respon){
            if(err) throw err;  
        })
        console.log(resp.applicant_email)
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

//increment application count of applicant 
router.post("/increment_application_count",(req,res) => {
    var email = req.body.email;
    var query = { email: email };
    var set = { $inc: { application_count: 1 } };
    Applicant.updateOne(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        console.log(resp.applicant_email)
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});


//decrement application count of applicant 
router.post("/decrement_application_count",(req,res) => {
    var email = req.body.email;
    var query = { email: email };
    var set = { $inc: { application_count: -1 } };
    Applicant.updateOne(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        console.log(resp.applicant_email)
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

// get all jobs
router.get("/jobs", function(req, res) {
    Job.find(function(err, Jobs) {
		if (err) {
			console.log(err);
		} else {
			res.json(Jobs);
		}
	})
});

// find all the non-deleted jobs for applicant
router.get("/job/view_for_applicant",(req,res) => {
    var email = req.body.email_rec;
    Job.find({status:"present" , deadline_of_application: { $gt : Date.now() } })    
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
    .catch(resp =>{
        res.status(400).json(err);
        console.log(err);
        return err;
    });
});

// find all job from perticular recruiter
router.post("/job/search",(req,res) => {
    var job_ka_title = req.body.job_title;
    Job.find({status:"present", title: job_ka_title })
    .then(resp => {
        res.status(200).json(resp);         
        console.log(resp);
        return resp;
    })
    .catch(resp => {
        res.status(400).json(err);
        console.log(err);
        return err;
    });
});

//find all the jobs of perticular duration 
router.post("/job/filterbyduration",(req,res) => {
    var job_ka_duration = req.body.job_duration;
    console.log(res.body)
    Job.find({status:"present", duration: { $lt: job_ka_duration} })
    .then(resp => {
        res.status(200).json(resp);         
        console.log(resp);
        return resp;
    })
    .catch(resp => {
        res.status(400).json(err);
        console.log(err);
        return err;
    });
});

// find all job of perticular job type (job type filter)
router.post("/job_type_filter",(req,res) => {
    var job_ka_type = req.body.job_ka_type;
    Job.find({status:"present", type_of_job: job_ka_type })
    .then(resp => {
        res.status(200).json(resp);         
        console.log(resp);
        return resp;
    })
    .catch(resp => {
        res.status(400).json(err);
        console.log(err);
        return err;
    });
});

// find all job of between a range of salary (job salary filter)
router.post("/salaryfilter",(req,res) => {
    var minimumsalary = req.body.min;
    var maximumsalary = req.body.max;
    Job.find({status:"present", salary_per_month: { $gte: minimumsalary, $lte: maximumsalary }})
    .then(resp => {
        res.status(200).json(resp);         
        console.log(resp);
        return resp;
    })
    .catch(resp => {
        res.status(400).json(err);
        console.log(err);
        return err;
    });
});

// find all job from perticular recruiter
router.post("/job/view",(req,res) => {
    var email = req.body.email_rec;
    Job.find({email_recruiter: email , status:"present" , deadline_of_application : { $gt : Date.now() } })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

// delete a job by recruiter
router.post("/job/delete",(req,res) => {
    var id = req.body.id;
    var query = { _id: id };
    var set = { $set: { status: "deleted" } };
    Job.updateMany(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
});

// get a job by id
router.post("/get_a_job_by_id",(req,res) => {
    var id = req.body.id;
    var query = { _id: id };
    Job.findOne(query, function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        return resp;
    })
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
        // applicant_rating: req.data.rating,
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
            });
        
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

// Add a job
router.post('/job/add', (req, res) => {
        console.log(req);
        
        Job.findOne({email_recruiter : req.body.email_recruiter , title:req.body.title})
        .then(jobb =>{
            let job = new Job({
                title: req.body.title,
                max_applications: req.body.max_applications,
                max_positions:  req.body.max_positions,
                deadline_of_application: req.body.deadline_of_application,
                required_skills: req.body.required_skills,
                type_of_job: req.body.type_of_job,
                duration: req.body.duration,
                salary_per_month: req.body.salary_per_month,
                name_recruiter: req.body.name_recruiter,
                email_recruiter: req.body.email_recruiter,
                date_of_posting: Date.now(),
                status: "present"
            });
            console.log(job);
            job.save()
            .then(job => {
                res.status(200).json(job);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
        })
        
        
});

// Add a job
router.post('/job/edit', (req, res) => {
    console.log(req);
    Job.findOne({email_recruiter : req.body.email_recruiter , title:req.body.title})
    .then(jobb =>{
        var query = {email_recruiter:req.body.email_recruiter , title:req.body.title};
        var set = { $set:{
            // title: req.body.title,
            max_applications: req.body.max_applications,
            max_positions:  req.body.max_positions,
            deadline_of_application: req.body.deadline_of_application,
            required_skills: req.body.required_skills,
            type_of_job: req.body.type_of_job,
            duration: req.body.duration,
            salary_per_month: req.body.salary_per_month,
            name_recruiter: req.body.name_recruiter,
            email_recruiter: req.body.email_recruiter,
            // date_of_posting: Date.now(),
            status: "present"                    
        }}
        Job.updateOne(query , set, function(err, resp){
            if (err) throw err;
        })
        .then(resp => {
            res.status(200).json(resp);
            console.log(resp);
            return resp;
        });
    })
    
    
});

module.exports = router;

