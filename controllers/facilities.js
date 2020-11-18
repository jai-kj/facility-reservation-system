const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const {
	getAll,
	getOne,
	updateOne,
	addOne,
	getTypes,
} = require("../services/facilityService");

// @desc    Get all facilities
// @route   GET /fr/api/v1/facilities
// @route   GET /fr/api/v1/users/:svvID/facilities
// @access  Private/Unauthorized

exports.getFacilities = asyncHandler(async (req, res, next) => {
	if (req.params.svvID) {
		if (req.advQuery.where) {
			req.advQuery.where.facilityIncharge = req.params.svvID;
		} else {
			req.advQuery.where = {};
			req.advQuery.where.facilityIncharge = req.params.svvID;
		}
	}
	const facilities = await getAll(req.advQuery);
	if (facilities.err) {
		return next(facilities.err);
	}
	res
		.status(200)
		.json({ success: true, count: facilities.length, data: facilities });
});

// @desc    Get single facility
// @route   GET /fr/api/v1/facilities/:facilityID
// @access  Private/Unauthorized

exports.getFacility = asyncHandler(async (req, res, next) => {
	const facility = await getOne(req.params.facilityID, req.advQuery);
	if (facility.message) {
		return next(new ErrorResponse(facility.message, facility.statusCode));
	}
	res.status(200).json({ success: true, data: facility });
});

// @desc    Add Facility
// @route   POST /fr/api/v1/facilities
// @access  Private/Authorized

exports.addFacility = asyncHandler(async (req, res, next) => {
	req.body.facilityIncharge = req.user.svvID;
	const facility = await addOne(req.body);
	if (facility.err) {
		return next(facility.err);
	}
	res.status(201).json({ success: true, data: facility });
});

// @desc    Update facility
// @route   PUT /fr/api/v1/facilities/:facilityID
// @access  Private/Authorized

exports.updateFacility = asyncHandler(async (req, res, next) => {
	// Deleting facilityID and facilityIncharge from req body as it is not allowed to be updated
	if (req.body.facilityID) {
		delete req.body.facilityID;
	}
	if (req.body.facilityIncharge) {
		delete req.body.facilityIncharge;
	}

	const facility = await updateOne(
		req.user.svvID,
		req.params.facilityID,
		req.body
	);
	if (facility.message) {
		return next(new ErrorResponse(facility.message, facility.statusCode));
	}
	if (facility.err) {
		return next(facility.err);
	}
	res.status(200).json({ success: true, data: facility });
});

// @desc    Get facility types
// @route   Get /fr/api/v1/facilities/types
// @access  Private/Unauthorized

exports.getFacilityTypes = asyncHandler(async (req, res, next) => {
	const types = await getTypes();
	if (types.err) {
		return next(types.err);
	}
	res.status(200).json({ success: true, data: types });
});
