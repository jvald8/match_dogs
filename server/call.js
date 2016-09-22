require('dotenv').config();
// require the .env variables

var key = process.env.KEY;
var secret = process.env.SECRET;

var fs = require(`fs`);
var request = require(`superagent`);
var moment = require(`moment`);
var petfinder = require(`petfinder-promise`)(key, secret);

petfinder.pet.get(36239820, {output: 'Full'}).then(function (breeds) {
	console.log(breeds);
}).catch(function (err) {
	console.log(`Error: ${err.message}`);
})
