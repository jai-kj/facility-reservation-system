const sequelize = require("sequelize");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// const { HOST, DB, USER, PASS, DB_PORT } = process.env;
// console.log(process.env.HOST);
const db = new sequelize("facilityreservation", "root", `vinca@282000`, {
	host: `localhost`,
	dialect: "mysql",
	port: 3307
});

// const db = new sequelize(`${DB}`, `${USER}`, `${PASS}`, {
// 	host: `${HOST}`,
// 	dialect: "mysql",
// 	port: DB_PORT
// });

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
