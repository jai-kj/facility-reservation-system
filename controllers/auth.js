const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { authService } = require("../services/authService");

// @desc    Register a User
// @route   POST /fr/api/v1/auth
// @access  Private

exports.registerUser = asyncHandler(async (req, res, next) => {
	const { body } = req;
	const user = await authService.register(body);

	if (user.err) {
		return next(new ErrorResponse(`User cannot be added : Bad request`, 400));
	}

	res.status(200).json({ success: true, data: user.user });
});
