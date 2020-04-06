const asyncHandler = require("../middleware/async");
const Facility = require("../db/models/Facility");
const Mapper = require("../db/models/Mapper");
const Time = require("../db/models/Time");
const Request = require("../db/models/Request");
const DailySchedule = require("../db/models/DailySchedule");

const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.getAll = asyncHandler(async (advQuery) => {
	advQuery.include = [];

	if (advQuery.includeModels && advQuery.includeModels.includes("Time")) {
		advQuery.include.push({
			model: Mapper,
			as: "weeklySchedules",
			attributes: ["day"],
			include: {
				model: Time,
				attributes: ["timeID", "startTime", "endTime"],
			},
		});
	}

	if (advQuery.includeModels && advQuery.includeModels.includes("Request")) {
		advQuery.include.push({
			model: Request,
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
				attributes: ["timeID", "startTime", "endTime"],
			},
		});
	}

	if (advQuery.includeModels && advQuery.includeModels.includes("Request")) {
		advQuery.include.push({
			model: Request,
		});
	}

	const facilities = await Facility.findByPk(facilityID, advQuery);
	return facilities;
});

exports.addOne = asyncHandler(async (body) => {
	let result = {};
	const {
		facilityName,
		facilityType,
		facilityStartTime,
		facilityEndTime,
		facilityIncharge,
	} = body;

	const facility = await Facility.create({
		facilityName,
		facilityType,
		facilityIncharge,
		facilityStartTime,
		facilityEndTime,
	}).catch((err) => {
		result.err = err;
		return result;
	});

	result = facility;
	return result;
});

exports.updateOne = asyncHandler(async (svvID, facilityID, updateData) => {
	let result = {};

	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		result.message = `Facility not found with ID :${facilityID}`;
		result.statusCode = 404;
		return result;
	}
	if (facility.facilityIncharge !== svvID) {
		result.message = `User ${svvID} is not authorized to access this route.`;
		result.statusCode = 401;
		return result;
	}

	updatedFacility = await facility.update(updateData);
	return updatedFacility;
});
