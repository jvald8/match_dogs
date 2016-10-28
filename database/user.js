require('dotenv').config();
// require the .env variables

var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB,
	port: process.env.MYSQL_PORT
});

exports.getUser = function(data, db) {
	console.log({db: db})
	pool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM humans WHERE fb_id=${data.id}`, function(err, rows, fields) {
			if(err) throw err;
			console.log({user_exists: rows});
			// if it doesn't exist, create a new user.
			if(rows.length === 0) {

				connection.query(`INSERT INTO humans VALUES (null, ${data.id}, null, '${data.name.familyName}', '${data.name.givenName}', '${data.gender}', '${data.profileUrl}', '${data._json.verified}', '${data.photos[0].value}', ${data._json.friends.summary.total_count}, null)`, function(err, rows, fields) {
					if(err) throw err;

					console.log({post_message: `created user: ${data.name.givenName} ${data.name.familyName} in humans table`})

					return rows;

					connection.release();
					
				});

			}
			return rows

			connection.release();
		});
	});
}

exports.addUserEmailandLocation = function(data, db) {
	pool.getConnection(function(err, connection) {

		var userId = parseInt(data.body.id),
			email = data.body.email,
			location = data.body.location;

		connection.query(`Update humans set email = '${email}', location = '${location}' where fb_id=${userId}`,function(err,rows,fields) {
			if(err) throw err;
			console.log(rows)

			connection.release();
		})

	});

	return db.redirect('/app');
}

exports.profileFinished = function(profileId, res) {
	pool.getConnection(function(err, connection) {

		connection.query(`SELECT * FROM humans where fb_id=${profileId}`, function(err, rows, fields) {
			if(err) throw err;

			if(rows[0] !== undefined) {
				if(!rows[0].email) {
					res.redirect('/finishProfile');
				} else {
					res.redirect('/app')
				}
			}

			res.status(200);

			connection.release();
		})
	})
}

module.exports.yesDog = function(req, res) {
	var userId = parseInt(req.body.id),
		dogId = parseInt(req.params.dogId);

	console.log({userId: userId, dogId: dogId});

	return res.json({userId: userId})
}



module.exports.noDog = function(req, res) {
	
}
