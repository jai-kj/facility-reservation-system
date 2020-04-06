const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errors");

//* Configuring ENV
dotenv.config({ path: "./config/config.env" });

//* Connecting DB
const db = require("./config/db");

//* Selecting server port
const PORT = process.env.PORT || 5000;

//* Initializing server
const app = express();

//* Enabling parsing of request body
app.use(express.json());
app.use(cookieParser());

//* Dev logging middleware
if ((process.env.NODE_ENV = "development")) {
	app.use(morgan("dev"));
}

//* Routes Files
const auth = require("./routes/auth");
const events = require("./routes/events");
const facilities = require("./routes/facilities");
const users = require("./routes/users");

//* Mounting Route
app.use("/fr/api/v1/events", events);
app.use("/fr/api/v1/facilities", facilities);
app.use("/fr/api/v1/auth", auth);
app.use("/fr/api/v1/users", users);
// app.use("/fr/api/v1/test", require("./routes/Test"));

app.use(errorHandler);

//* Spinning up server
const server = app.listen(PORT, () =>
	console.log(`Server started at port : ${PORT}`.yellow)
);

//* Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red.bold);
	// Close server
	server.close(() => process.exit(1));
});
