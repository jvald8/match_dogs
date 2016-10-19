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
	pool.getConnection(function(err, connection) {
		// gets user with id 1 for now
		//console.log({data: data})
		connection.query(`SELECT * FROM humans WHERE fb_id=${data.id}`, function(err, rows, fields) {
			if(err) throw err;
			console.log({object: rows});
			if(rows.length === 0) {
				// create user

				connection.query(`INSERT INTO humans VALUES (null, ${data.id}, null, '${data.name.familyName}', '${data.name.givenName}', '${data.gender}', '${data.profileUrl}', '${data._json.verified}', '${data.photos[0].value}', ${data._json.friends.summary.total_count}, null)`, function(err, rows, fields) {
					if(err) throw err;
					//console.log({object: rows});
					if(rows.length === 0) {
						// create user
					} else {
						return rows;
					}

					connection.release();
				});

			} else {
				return rows;
			}

			connection.release();
		})
	})
}

exports.addUserEmailandLocation = function(data, db) {
	pool.getConnection(function(err, connection) {
		// add the email here //data

		console.log({data: data.body})

		var userId = parseInt(data.body.id),
			email = data.body.email,
			location = data.body.location;

		connection.query(`Update humans set email = '${email}', location = '${location}' where fb_id=${userId}`,function(err,rows,fields) {
			if(err) throw err;
			console.log(rows)

			connection.release();
		})

	})
}
