const sequelize = require("sequelize");
const Op = sequelize.Op;

const Facility = require("../db/models/Facility");
const Mapper = require("../db/models/Mapper");
const Time = require("../db/models/Time");
const Request = require("../db/models/Request");
const DailySchedule = require("../db/models/DailySchedule");

exports.getAll = async (advQuery) => {
	let result = {};
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
	const facilities = await Facility.findAll(advQuery).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	return facilities;
};

exports.getOne = async (facilityID, advQuery) => {
	let result = {};
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

	const facility = await Facility.findByPk(facilityID, advQuery).catch(
		(err) => {
			result.er = err;
		}
	);
	if (result.err) return result;
	if (!facility) {
		result.message = `Facility not found with ID :${facilityID}`;
		result.statusCode = 404;
		return result;
	}
	result = facility;
	return result;
};

exports.addOne = async (body) => {
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
};

exports.updateOne = async (svvID, facilityID, updateData) => {
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
};
