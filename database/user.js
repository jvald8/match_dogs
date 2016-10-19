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

				connection.query(`INSERT INTO humans VALUES (null, ${data.id}, null, '${data.name.familyName}', '${data.name.givenName}', '${data.gender}', '${data.profileUrl}', '${data._json.verified}', '${data.photos[0].value}', ${data._json.friends.summary.total_count})`, function(err, rows, fields) {
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

exports.addUserEmail = function(data, db) {
	pool.getConnection(function(err, connection) {
		// add the email here //data
		connection.query(`INSERT INTO humans (email) values ${data}`)

	})
}
