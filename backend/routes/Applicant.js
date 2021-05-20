var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const Applicant = require("../models/applicants");

router.get("/s", function(req, res) {
	res.send("API is working properly !");
});
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
    Applicant.findOne(query, function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp).send();
        console.log('get_an_applicant_by_email ka response is ', resp);
        // return resp;
    })
});

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
//edit applicant's profile
router.post('/edit_applicant_profile', (req, res) => {
    console.log(req);
    var query = {email:req.body.email };
    var set = { $set:{
        name: req.body.name,
        list_of_languages: req.body.list_of_languages,
        education: req.body.education,
        // image: req.body.image,
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

// Login


// rate an applicant by recruiter
router.post("/rate_an_applicant",(req,res) => {
    console.log(req)
    var email = req.body.email;
    var query = { email: email };
    var set = {   rate_count: req.body.rate_count , rating:req.body.rating  };
    Applicant.updateOne(query , set , function(err , resp){
        if (err) throw err;
    })
    .then(resp => {
        // var sett = { $divide: [ { $inc: {rating: req.body.value} } , resp.data.rate_count ]};
        // Applicant.updateOne(query , sett , function(err,respon){
        //     if(err) throw err;  
        // })
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
        // console.log(resp);
        return resp;
    })
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/" + req.query.type);
    },
    filename: function (req, file, cb) {
        // this is where the book receives its distinct file_name structure
        fileName = req.query.email + path.extname(file.originalname);
        if(req.query.type == 'image'){
            Applicant.updateOne({email:req.query.email}, {
                $set: {image: fileName}
            }, err => {
                console.log(err);
            }); 
        }
      cb(
        null,
        fileName
      );
    },
  });
  
  // renaming the multer function as upload
  var upload = multer({ storage: storage });

// send request with parameter id to add the cv
router.post("/addfile", upload.single('file'), (req,res)=>{
    console.log("adding file");
    let userid = req.query.email;
    let type = req.query.type;
    console.log("got this ", userid, type);
    res.status(200).send();
});

module.exports = router;