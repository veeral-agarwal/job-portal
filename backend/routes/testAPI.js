var express = require("express");
var router = express.Router();

// GET request 
// Just a test API to check if server is working properly or not
router.get("/", function(req, res) {
	res.send("API is working properly !");
});

router.get("/hie", function(req, res) {
	res.send("hii ");
});

router.get("/hiiiiie", function(req, res) {
	res.send("hello");
});

module.exports = router;
