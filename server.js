const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
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

//* Additional security headers
app.use(helmet());

//* preventing Cross site scripting
app.use(xss());

//* Enabling Hpp
app.use(hpp());

//* Routes Files
const auth = require("./routes/auth");
const events = require("./routes/events");
const facilities = require("./routes/facilities");
const users = require("./routes/users");
const requests = require("./routes/requests");

//* Mounting Route
app.use("/fr/api/v1/events", events);
app.use("/fr/api/v1/facilities", facilities);
app.use("/fr/api/v1/auth", auth);
app.use("/fr/api/v1/users", users);

app.use(errorHandler);

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('frontend/build'))

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

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
