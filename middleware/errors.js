const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	//? Allotting error as per the error occurred

	// //* Mongoose Bad objectID
	// if (err.name === "CastError") {
	// 	const message = `Resource not found with ID: ${err.value}`;
	// 	error = new ErrorResponse(message, 404);
	// }

	// //* If there is duplicate entry error
	// if (err.code === 1100) {
	// 	const message = `Duplicate field value entered`;
	// 	error = new ErrorResponse(message, 400);
	// }

	//* If there is a validation error
	if (err.name === "SequelizeValidationError") {
		const message = Object.values(err.errors).map(val => val.message);
		error = new ErrorResponse(message, 400);
	}

	//* log to console the error message for dev
	console.log(err.stack.red);
	// console.log(err.message.yellow);
	//? Returning the final response with error

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error"
	});
};

module.exports = errorHandler;
