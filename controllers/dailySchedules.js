const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {
	getAll,
	addOne,
	updateOne,
	deleteOne,
} = require("../services/dailyScheduleService");

// @desc    Get daily schedule of a facility
// @route   GET /fr/api/v1/facilities/:facilityID/dailyschedules
// @access  Private/Unauthorized
exports.getDailySchedules = asyncHandler(async (req, res, next) => {
	if (!req.advQuery.where) {
		req.advQuery.where = {};
	}
	req.advQuery.where.facilityID = req.params.facilityID;

	const schedules = await getAll(req.advQuery);

	if (schedules.err) {
		return next(schedules.err);
	}
	res.status(200).json({
		success: true,
		count: schedules.length,
		data: schedules,
	});
});

// @desc    Add daily schedule of a facility
// @route   POST /fr/api/v1/facilities/:facilityID/dailyschedules
// @access  Private/Authorized
exports.addDailySchedules = asyncHandler(async (req, res, next) => {
	const schedules = await addOne(
		req.user.svvID,
		req.params.facilityID,
		req.body
	);
	if (schedules.message) {
		return next(new ErrorResponse(schedules.message, schedules.statusCode));
	}
	if (schedules.err) {
		return next(schedules.err);
	}
	res.status(201).json({
		success: true,
		count: schedules.length,
		data: schedules,
	});
});

// @desc    Update daily schedule of a facility
// @route   PUT /fr/api/v1/facilities/:facilityID/dailyschedules
// @access  Private/Authorized
exports.updateDailySchedules = asyncHandler(async (req, res, next) => {
	const schedules = await updateOne(
		req.user.svvID,
		req.params.facilityID,
		req.body
	);
	if (schedules.message) {
		return next(new ErrorResponse(schedules.message, schedules.statusCode));
	}
	if (schedules.err) {
		return next(schedules.err);
	}
	res.status(200).json({
		success: true,
		count: schedules.length,
		data: schedules,
	});
});

// @desc    Delete daily schedule of a facility
// @route   DELETE /fr/api/v1/facilities/:facilityID/dailyschedules
// @access  Private/Authorized
exports.deleteDailySchedules = asyncHandler(async (req, res, next) => {
	if (!req.advQuery.where) {
		req.advQuery.where = {};
	}
	req.advQuery.where.facilityID = req.params.facilityID;

	const schedules = await deleteOne(
		req.user.svvID,
		req.params.facilityID,
		req.advQuery
	);
	if (schedules.message) {
		return next(new ErrorResponse(schedules.message, schedules.statusCode));
	}
	if (schedules.err) {
		return next(schedules.err);
	}
	res.status(200).json({
		success: true,
		count: schedules.length,
		data: schedules,
	});
});
