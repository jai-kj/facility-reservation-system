const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {
	getAll,
	getOne,
	addOne,
	updateOne,
} = require("../services/requestService");

// @desc    Get all requests of a event / facility
// @route   GET /fr/api/v1/events/eventID/requests
// @route   GET /fr/api/v1/facility/facilityID/requests
// @access  Private/Authorized

exports.getRequests = asyncHandler(async (req, res, next) => {
	const requests = await getAll(req.user.svvID, req.params, req.advQuery);
	if (requests.message) {
		return next(new ErrorResponse(requests.message, requests.statusCode));
	}
	if (requests.err) {
		return next(requests.err);
	}

	res
		.status(200)
		.json({ success: true, count: requests.length, data: requests });
});

// @desc    Get single request of a event / facility
// @route   GET /fr/api/v1/events/eventID/requests/:requestID
// @route   GET /fr/api/v1/facility/facilityID/requests/:requestID
// @access  Private/Authorized

exports.getRequest = asyncHandler(async (req, res, next) => {
	const request = await getOne(req.user.svvID, req.params, req.advQuery);
	if (request.message) {
		return next(new ErrorResponse(request.message, request.statusCode));
	}
	if (request.err) {
		return next(request.err);
	}

	res.status(200).json({ success: true, data: request });
});

// @desc    Add request of a event
// @route   POSt /fr/api/v1/events/eventID/requests
// @access  Private/Authorized

exports.addRequest = asyncHandler(async (req, res, next) => {
	const request = await addOne(req.user.svvID, req.params, req.body);
	if (request.message) {
		return next(new ErrorResponse(request.message, request.statusCode));
	}
	if (request.err) {
		return next(request.err);
	}

	res.status(201).json({ success: true, data: request });
});

// @desc    Update request of a event
// @route   PUT /fr/api/v1/facilities/:facilityID/requests/:requestID
// @access  Private/Authorized

exports.updateRequest = asyncHandler(async (req, res, next) => {
	const request = await updateOne(
		req.user.svvID,
		req.params,
		req.body.requestStatus
	);
	if (request.message) {
		return next(new ErrorResponse(request.message, request.statusCode));
	}
	if (request.err) {
		return next(request.err);
	}

	res.status(200).json({ success: true, data: request });
});
