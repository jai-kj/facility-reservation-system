const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const { timetable, weeklyTimetable } = require("../services/timetableService");

// @desc    Get time table of a facility on a particular day
// @route   GET /fr/api/v1/facilities/:facilityID/timetable/:date
// @access  Private/Unauthorized

exports.getTimeTable = asyncHandler(async (req, res, next) => {
	const timeSlots = await timetable(req.params.facilityID, req.params.date);
	if (timeSlots.message) {
		return next(new ErrorResponse(timeSlots.message, timeSlots.statusCode));
	}
	if (timeSlots.err) {
		return next(timeSlots.err);
	}

	res
		.status(200)
		.json({ success: true, count: timeSlots.length, data: timeSlots });
});

// @desc    Get time table of a facility in a date range
// @route   GET /fr/api/v1/facilities/:facilityID/timetable/weekly/:date
// @access  Private/Unauthorized

exports.getWeeklyTimeTable = asyncHandler(async (req, res, next) => {
	const timeSlots = await weeklyTimetable(
		req.params.facilityID,
		req.params.date
	);
	if (timeSlots.message) {
		return next(new ErrorResponse(timeSlots.message, timeSlots.statusCode));
	}
	if (timeSlots.err) {
		return next(timeSlots.err);
	}

	res.status(200).json({ success: true, data: timeSlots });
});
