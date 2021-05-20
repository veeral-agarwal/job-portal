var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/s", function(req, res) {
	res.send("API is working properly !");
});

router.get("/user", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// Add a user to db
// router.post("/user/add", (req, res) => {
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         type: req.body.type,
//         date: req.body.date
//     });
//     newUser.save()
//     .then(user => {
//         res.status(200).json(user);
//     })
//     .catch(err => {
//         res.status(400).send(err);
//     });
// });
router.post("/updateuser", (req, res) => {
    console.log(req.body.email)
    console.log(req.body.name)
    var query = { email:req.body.email };
    var set = { $set:{
        name: req.body.name,
    }}
    User.updateOne(query , set, function(err, resp){
        if (err) throw err;
    })
    .then(resp => {
        res.status(200).json(resp);
        console.log(resp);
        
});
})



// POST request 
// Add a user to db
router.post("/register", (req, res) => {
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


module.exports = router;

