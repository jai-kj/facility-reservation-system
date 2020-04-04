const asyncHandler = require("../middleware/async");
const Facility = require("../db/models/Facility");
const Mapper = require("../db/models/Mapper");
const Time = require("../db/models/Time");
const Request = require("../db/models/Request");

const sequelize = require("sequelize");
// const Op = sequelize.Op;

exports.getAll = asyncHandler(async advQuery => {
	advQuery.include = [];

	if (advQuery.includeModels && advQuery.includeModels.includes("Time")) {
		advQuery.include.push({
			model: Mapper,
			as: "weeklySchedules",
			attributes: ["day"],
			include: {
				model: Time,
				attributes: ["timeID", "startTime", "endTime"]
			}
		});
	}

	if (advQuery.includeModels && advQuery.includeModels.includes("Request")) {
		advQuery.include.push({
			model: Request
		});
	}
	const facilities = await Facility.findAll(advQuery);
	return facilities;
});
exports.getOne = asyncHandler(async (facilityID, advQuery) => {
	advQuery.include = [];
	if (advQuery.includeModels && advQuery.includeModels.includes("Time")) {
		advQuery.include.push({
			model: Mapper,
			as: "weeklySchedules",
			attributes: ["day"],
			include: {
				model: Time,
				attributes: ["timeID", "startTime", "endTime"]
			}
		});
	}

	if (advQuery.includeModels && advQuery.includeModels.includes("Request")) {
		advQuery.include.push({
			model: Request
		});
	}

	const facilities = await Facility.findByPk(facilityID, advQuery);
	return facilities;
});

exports.addOne = asyncHandler(async body => {
	// const facilityName,facilityType,
	return null;
});

exports.updateOne = asyncHandler(async (facilityID, updateData) => {
	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		return facility;
	}
	updatedFacility = await facility.update(updateData);
	return updatedFacility;
});
