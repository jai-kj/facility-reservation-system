const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { getAll, getOne } = require("../services/userService");

// @desc    Get all users
// @route   GET /fr/api/v1/users
// @access  Private/Unauthorized

exports.getUsers = asyncHandler(async (req, res, next) => {
	const users = await getAll(req.advQuery);
	if (users.err) {
		return next(users.err);
	}
	res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc    Get single user
// @route   GET /fr/api/v1/users/:svvID
// @access  Private/Unauthorized

exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await getOne(req.params.svvID, req.advQuery);
	if (user.message) {
		return next(new ErrorResponse(user.message, user.statusCode));
	}
	if (user.err) {
		return next(user.err);
	}
	res.status(200).json({ success: true, data: user });
});
