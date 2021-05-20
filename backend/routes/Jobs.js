var express = require("express");
var router = express.Router();
const Job = require("../models/Jobs");

router.get("/s", function(req, res) {
	res.send("API is working properly !");
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