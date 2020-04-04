const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { getAll, getOne } = require("../services/userService");

// @desc    Get all users
// @route   GET /fr/api/v1/users
// @access  Private/Unauthorized

exports.getUsers = asyncHandler(async (req, res, next) => {
	const users = await getAll(req.advQuery);
	res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc    Get single user
// @route   GET /fr/api/v1/users/:svvID
// @access  Private/Unauthorized

exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await getOne(req.params.svvID, req.advQuery);
	if (!user) {
		return next(
			new ErrorResponse(`User not found with SVV ID : ${req.params.svvID}`, 404)
		);
	}
	res.status(200).json({ success: true, data: user });
});
