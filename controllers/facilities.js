const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

const { getAll, getOne, updateOne } = require("../services/facilityService");

// @desc    Get all facilities
// @route   GET /fr/api/v1/facilities
// @access  Private/Unauthorized

exports.getFacilities = asyncHandler(async (req, res, next) => {
	const facilities = await getAll(req.advQuery);
	res
		.status(200)
		.json({ success: true, count: facilities.length, data: facilities });
});

// @desc    Get single facility
// @route   GET /fr/api/v1/facilities/:facilityID
// @access  Private/Unauthorized

exports.getFacility = asyncHandler(async (req, res, next) => {
	const facility = await getOne(req.params.facilityID, req.advQuery);
	if (!facility) {
		return next(
			new ErrorResponse(
				`Facility not found with ID : ${req.params.facilityID}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: facility });
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

	const facility = await updateOne(req.params.facilityID, req.body);
	if (!facility) {
		return next(
			new ErrorResponse(
				`Facility not found with ID : ${req.params.facilityID}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: facility });
});
