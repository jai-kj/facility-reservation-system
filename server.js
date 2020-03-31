const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

//* Configuring ENV
dotenv.config({ path: "./config/config.env" });

//* Connecting DB
const db = require("./config/db");

//* Selecting server port
const PORT = process.env.PORT || 5000;

//* Initializing server
const app = express();

//* Dev logging middleware
if ((process.env.NODE_ENV = "development")) {
	app.use(morgan("dev"));
}

//* Routes Files

//* Mounting Route

//* Spinnig up server
const server = app.listen(PORT, () =>
	console.log(`Server started at port : ${PORT}`.yellow)
);

//* Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red.bold);
	// Close server
	server.close(() => process.exit(1));
});
