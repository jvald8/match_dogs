require('dotenv').config();
// require the .env variables

var key = process.env.KEY;
var secret = process.env.SECRET;

var fs = require(`fs`);
var request = require(`superagent`);
var moment = require(`moment`);
var petfinder = require(`petfinder-promise`)(key, secret);

petfinder.pet.find('93117',{animal: 'dog', age: 'Baby'}).then(function (breeds) {
	console.log(breeds);
}).catch(function (err) {
	console.log(`Error: ${err.message}`);
})
