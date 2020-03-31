const asyncHandler = require("../middleware/async");
const User = require("../db/models/User");

exports.register = asyncHandler(async body => {
	const { svvID, name, email, password, designation } = body;
	let response = {};
	const user = await User.create({
		svvID,
		name,
		email,
		password,
		designation
	}).catch(err => {
		response.err = err;
		return response;
	});
	response.data = user;
	return response;
});
