require("nodejs-dashboard");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var call = require('./call');

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
	console.log('something is happening');
	next();
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res) {
	res.json({message: 'hooray! welcome to our api!'});
});

// gets
router.get('/getDog/:dogId', call.getDog);
router.get('/getDogIds/:zipCode', call.getDogIds);

//getDogIds

app.use('/api', router);

app.listen(port);
console.log(`Magic happens on port ${port}`);