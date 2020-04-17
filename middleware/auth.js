const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../db/models/User");

/*
 * This function is used to check for tokens in requests and add user object to request object for
 * further use
 */
exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
		) {
		//* Set token from Bearer token in header
		token = req.headers.authorization.split(" ")[1];
	}
	//* If token not found in header find it in cookies
	else if (req.cookies.token) {
		token = req.cookies.token;
	}

	//* Check if token exist
	if (!token) {
		return next(new ErrorResponse(`Not authorized to access this route`, 401));
	}
	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Add user object to request object
		req.user = await User.findByPk(decoded.svvID);

		next();
	} catch (err) {
		return next(new ErrorResponse("Not authorized to access this route", 401));
	}
});

/*
 * This function is used to check for designation of user accessing the route and allow only authorized
 * designated user through this route
 * 
   @params {*} designation : designations as arguments authorized to access this route 
 */

exports.authorize = (...designations) => {
	return (req, res, next) => {
		if (!designations.includes(req.user.designation)) {
			next(
				new ErrorResponse(
					`User with designation : ${req.user.designation} not authorized to access this route`,
					401
				)
			);
		}
		next();
	};
};
