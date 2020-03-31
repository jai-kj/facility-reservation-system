const sequelize = require("sequelize");

const { HOST, DB, USER, PASS, DB_PORT } = process.env;

const db = new sequelize(`${DB}`, `${USER}`, `${PASS}`, {
	host: `${HOST}`,
	dialect: "mysql",
	port: DB_PORT
});

db.authenticate()
	.then(() => {
		console.log(
			"Connection has been established successfully.".brightGreen.bold
		);
	})
	.catch(err => {
		console.error(`Unable to connect to the database:${err}`.red.bold);
	});
module.exports = db;
