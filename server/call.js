require('dotenv').config();
// require the .env variables

var key = process.env.KEY;
var secret = process.env.SECRET;

var fs = require(`fs`);
var request = require(`superagent`);
var moment = require(`moment`);
var petfinder = require(`petfinder-promise`)(key, secret);

module.exports.getDog = function(req, res) {
	var dogId = req.params.dogId;
	petfinder.pet.get(dogId, {output: 'Full'}).then(function (dog) {
		console.log(dog);
		res.json({res: dog})
	}).catch(function (err) {
		console.log(`Error: ${err.message}`);
	})
};

//test dog id 36239820
