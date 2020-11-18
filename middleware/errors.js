const ErrorResponse = require("../utils/errorResponse");

/**
 ** A middleware function to accept caught errors and respond client with relevant error message based
 ** on caught error category
 * @param {*} err : err passed by controller methods to middleware
 * @param {*} req : req passed by client
 * @param {*} res : response object
 * @param {*} next : call to next middleware if any
 */
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;
	//* If error is set wit ErrorResponse then the msg
	//* will be copied here in error object

	//* If there is no custom error message
	if (!error.message) {
		//? Allotting error message as per the error category

		//* If there is a validation error
		if (err.name === "SequelizeValidationError") {
			const message = Object.values(err.errors).map((val) => val.message);
			error = new ErrorResponse(message, 400);
		}

		//* If there is duplicate entry error
		else if (error.parent.errno === 1062) {
			const message = `Duplicate field value entered`;
			error = new ErrorResponse(message, 400);
		}
	}

	if (process.env.NODE_ENV === "development") {
		console.log(err.stack.red);
	}
	//? Returning the final response with error created above

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error",
	});
};

module.exports = errorHandler;