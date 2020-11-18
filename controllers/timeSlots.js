const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const {
	getSlotsAtDate,
	getDailySlots,
	timeTable,
} = require("../services/timeSlotService.js");

// @desc    Get available time slots to book event in facility on a date
// @route   GET /fr/api/v1/facilities/:facilityID/timeslots/:date
// @access  Private/Unauthorized

exports.getAvailTime = asyncHandler(async (req, res, next) => {
	const timeSlots = await getSlotsAtDate(
		req.params.facilityID,
		req.params.date
	);
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

// @desc    Get available time slots to add daily schedule of a facility
// @route   GET /fr/api/v1/facilities/:facilityID/timeslots
// @access  Private/Authorized

exports.getDailyScheduleSlots = asyncHandler(async (req, res, next) => {
	const timeSlots = await getDailySlots(req.user.svvID, req.params.facilityID);
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
