console.log("required routes module\r\n");

var app = require('express')();

var serverOptions = {
  "auto_reconnect": true,
  "poolSize": 5
}
var mailer = require("./mailer");

	// GET requests
	app
		.get('/', function(req, res, next) {
			res.redirect('/register');
		})
		.get('/register', function(req, res, next) {
			res.render('register', {  });
		})
		.get("*", function(req, res, next) {
			res.render("404page", {  });
		});

	// POST requests
	app //this is a post request for the sign up
		.post("/submit-info", function(req, res, next) {
			var email = req.body.email.toLowerCase(),
					firstName = req.body["first-name"],
					lastName = req.body["last-name"],
					fullName = firstName + " " + lastName,
					set = req.body.set
					tel = req.body.tel
					church = req.body.church;
			if(email && firstName && lastName && set) {
				if( email.match(/([a-z0-9])*([.][a-z0-9]*)?([@][a-z0-9]*[.][a-z]{1,3})([.][a-z]{1,2})?/i) ) {
					mailer("Confirmation", email, fullName, "Hello, " + firstName + ",\n\r\n\r This email is to confirm that your email has been sent succsessfully.").mailPost();

					mailer("New registrant", "piecedigitalstudios@gmail.com", "maintainer", "Hello, maintainer,\n\r\n\r You have recaived a new submission:\r\n <ul><li>Email: " + email + "</li><li>Name: " + fullName + "</li><li>Set: " + set + "</li><li>Phone: " + tel + "</li><li>CHurch Affiliation: " + church + "</li></ul>.").mailPost();

					res.render("register", { msg : "You information has bee submitted for review. An email has been sent to you for confirmation" });
				} else {
					res.render("register", { msg : "Please enter a valid email" });
				}
			} else {
				res.render("register", { msg : "Please fill out the entire form" });
			}
		})
module.exports = app;