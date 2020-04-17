const User = require("../db/models/User");

//* Function to register new user in the system
// @params {*} body : body object containing user details

exports.register = async (body) => {
	const { svvID, name, email, password, designation } = body;
	let result = {};
	const user = await User.create({
		svvID,
		name,
		email,
		password,
		designation,
	}).catch((err) => {
		//* If error occurs appending it to result object
		result.err = err;
	});
	if (result.err) return result;
	result = user;
	return result;
};

//* Function to log user into the system
// @params "*" svvID : SVV ID of the user
// @params "*" password: Password of the user

exports.login = async (svvID, password) => {
	let result = {};
	const user = await User.scope("withPwd").findByPk(svvID);
	if (!user) {
		result.message = `Username not found`;
		result.statusCode = 401;
		return result;
	}

	//* Check if the password matches
	const isMatch = await user.comparePassword(password);
	if (!isMatch) {
		result.message = `Incorrect Password`;
		result.statusCode = 401;
		return result;
	}
	result = generateToken(user, 200);

	return result;
};

//* Function to get logged in user
// @params "*" svvID : SVV ID of the user
exports.getMe = async (svvID) => {
	const user = await User.findByPk(svvID);
	return user;
};

//* Function to update user details in the system
// @params "*" svvID : SVV ID of the user
// @params {*} updateData : Object containing fields to be updated

exports.updateUserDetails = async (svvID, updateData) => {
	let result = {};
	const user = await User.findByPk(svvID);
	const updatedUser = await user.update(updateData).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	result = updatedUser;
	return result;
};

/**
 ** A function to form the result containing the JWT used for log in by user and cookie options to
 ** store generated token
 * @param {*} user :  instance of the user
 * @param int statusCode :  status code for response
 */
const generateToken = (user, statusCode) => {
	let resultObj = {};

	// calling user instance method to get signed JWT token from Model
	const token = user.getSignedJWTToken();

	//* Options object is for cookies that will be storing the token in browser for 30 days
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 //* 30 days time
		),
		httpOnly: true,
	};

	//* Use HTTPS if env is production
	if (process.env.NODE_ENV === "production") {
		option.secure = true;
	}

	//* Structuring result to return
	resultObj.token = token;
	resultObj.statusCode = statusCode;
	resultObj.cookieOptions = options;

	return resultObj;
};