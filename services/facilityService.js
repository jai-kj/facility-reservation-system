const asyncHandler = require("../middleware/async");
const Facility = require("../db/models/Facility");

exports.getAll = asyncHandler(async advQuery => {
	const facilities = await Facility.findAll(advQuery);
	return facilities;
});
exports.getOne = asyncHandler(async facilityID => {
	const facilities = await Facility.findByPk(facilityID);
	return facilities;
});
exports.updateOne = asyncHandler(async (facilityID, updateData) => {
	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		return facility;
	}
	updatedFacility = await facility.update(updateData);
	return updatedFacility;
});
