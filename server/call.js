require('dotenv').config();
// require the .env variables

var key = process.env.KEY;
var secret = process.env.SECRET;

var fs = require(`fs`);
var request = require(`superagent`);
var moment = require(`moment`);
var _ = require('lodash');
var petfinder = require(`petfinder-promise`)(key, secret);

module.exports.getDog = function(req, res) {
	var dogId = req.params.dogId;
	petfinder.pet.get(dogId, {output: 'Full'}).then(function (dog) {
		res.json({res: dog})
	}).catch(function (err) {
		console.log(`Error: ${err.message}`);
	})
};

module.exports.getDogIds = function(req, res) {
	var zipCode = req.params.zipCode;
	petfinder.pet.find(zipCode, {output: 'basic', count: 30}).then(function(dogIds) {
		console.log(dogIds.map(function(x) {return parseInt(x.id)}));
		res.json({res: dogIds})
	}).catch(function (err) {
		console.log(`Error: ${err.message}`)
	})
}
