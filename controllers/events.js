const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const {
	getAll,
	getOne,
	addOne,
	updateOne,
	deleteOne,
} = require("../services/eventService");

// @desc    Get all events
// @route   GET /fr/api/v1/events
// @route   GET /fr/api/v1/users/:svvID/events
// @access  Private/Unauthorized
exports.getEvents = asyncHandler(async (req, res, next) => {
	if (req.params.svvID) {
		if (req.advQuery.where) {
			req.advQuery.where.eventIncharge = req.params.svvID;
		} else {
			req.advQuery.where = {};
			req.advQuery.where.eventIncharge = req.params.svvID;
		}
	}

	const events = await getAll(req.advQuery);
	res.status(200).json({ success: true, count: events.length, data: events });
});

// @desc    Get single events
// @route   GET /fr/api/v1/events/:eventID
// @access  Private/Unauthorized
exports.getEvent = asyncHandler(async (req, res, next) => {
	const event = await getOne(req.params.eventID, req.advQuery);
	if (event.message) {
		return next(new ErrorResponse(event.message, event.statusCode));
	}
	if (event.err) {
		return next(event.err);
	}
	res.status(200).json({ success: true, data: event });
});

// @desc    Add event
// @route   POST /fr/api/v1/events
// @access  Private/Authorized
exports.addEvent = asyncHandler(async (req, res, next) => {
	const event = await addOne(req.user.svvID, req.body);
	if (event.message) {
		return next(new ErrorResponse(event.message, event.statusCode));
	}
	if (event.err) {
		return next(event.err);
	}
	res.status(201).json({ success: true, data: event });
});

// @desc    Update event
// @route   PUT /fr/api/v1/events/:eventID
// @access  Private/Authorized
exports.updateEvent = asyncHandler(async (req, res, next) => {
	// Deleting eventID and eventIncharge from req body as it is not allowed to be updated
	if (req.body.eventID) {
		delete req.body.eventID;
	}
	if (req.body.eventIncharge) {
		delete req.body.eventIncharge;
	}

	const event = await updateOne(req.user.svvID, req.params.eventID, req.body);
	if (event.message) {
		return next(new ErrorResponse(event.message, event.statusCode));
	}
	if (event.err) {
		return next(event.err);
	}
	res.status(200).json({ success: true, data: event });
});

// @desc    Delete event
// @route   DELETE /fr/api/v1/events/:eventID
// @access  Private/Authorized
exports.deleteEvent = asyncHandler(async (req, res, next) => {
	const event = await deleteOne(req.user.svvID, req.params.eventID);
	if (event.message) {
		return next(new ErrorResponse(event.message, event.statusCode));
	}
	if (event.err) {
		return next(event.err);
	}
	res.status(200).json({ success: true });
});
