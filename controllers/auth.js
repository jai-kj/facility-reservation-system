const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {
	register,
	login,
	updateUserDetails,
	getMe,
} = require("../services/authService");

// @desc    Register a User
// @route   POST /fr/api/v1/auth/register
// @access  Private/Authorized

exports.registerUser = asyncHandler(async (req, res, next) => {
	const user = await register(req.body);
	if (user.err) {
		//* If error in result -> passing error 'err' to errorHandler middleware
		return next(user.err);
	}
	res.status(201).json({ success: true, data: user });
});

// @desc    Login a user
// @route   POST /fr/api/v1/auth/login
// @access  Public

exports.loginUser = asyncHandler(async (req, res, next) => {
	const { svvID, password } = req.body;

	if (!svvID || !password) {
		return next(new ErrorResponse(`Please provide SVV ID and Password`, 400));
	}
	const result = await login(svvID, password);
	if (result.message) {
		return next(new ErrorResponse(result.message, result.statusCode));
	}

	res
		.status(result.statusCode)
		.cookie("token", result.token, result.cookieOptions)
		.json({ success: true, data: { token: result.token } });
});

// @desc    Get Logged in user
// @route   GET /fr/api/v1/auth/me
// @access  Private/Unauthorized

exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
	const user = await getMe(req.user.svvID);

	res.status(200).json({ success: true, data: user });
});

// @desc      Logout User
// @route     GET /fr/api/v1/auth/logout
// @access    Private/Unauthorized
exports.logout = asyncHandler(async (req, res, next) => {
	//* Send token = null in response and reset cookie by making token = ""
	res
		.status(200)
		.cookie("token", "", {
			expires: new Date(Date.now() + 10 * 1000),
			httpOnly: true,
		})
		.json({
			success: true,
			data: { token: null },
		});
});

// @desc    Update user details
// @route   PUT /fr/api/v1/auth/updatedetails
// @access  Private/Unauthorized

exports.updateDetails = asyncHandler(async (req, res, next) => {
	const fieldsToUpdate = {
		name: req.body.name,
		designation: req.body.designation,
	};

	const user = await updateUserDetails(req.user.svvID, fieldsToUpdate);
	if (user.err) {
		//* If error in result -> passing error 'err' to errorHandler middleware
		return next(user.err);
	}

	res.status(200).json({ success: true, data: user });
});