const sequelize = require("sequelize");
const Op = sequelize.Op;
const Event = require("../db/models/Event");
const Request = require("../db/models/Request");
const Facility = require("../db/models/Facility");
const RequestSchedule = require("../db/models/RequestSchedule");
const Time = require("../db/models/Time");

exports.getAll = async (svvID, designation, params, advQuery) => {
	let result = {};
	let flag = false;
	if (params.facilityID) {
		const facility = await Facility.findByPk(params.facilityID);
		if (!facility) {
			result.message = `Facility not found with ID : ${params.facilityID}`;
			result.statusCode = 404;
			return result;
		}
		if (facility.facilityIncharge !== svvID) {
			result.message = `User ${svvID} is not authorized to access this route.`;
			result.statusCode = 401;
			return result;
		}

		if (!advQuery.where) {
			advQuery.where = {};
		}
		advQuery.where["facilityID"] = params.facilityID;
		flag = true;
	} else if (params.eventID) {
		const event = await Event.findByPk(params.eventID);
		if (!event) {
			result.message = `Event not found with ID : ${params.eventID}`;
			result.statusCode = 404;
			return result;
		}
		if (event.eventIncharge !== svvID) {
			result.message = `User ${svvID} is not authorized to access this route.`;
			result.statusCode = 401;
			return result;
		}

		if (!advQuery.where) {
			advQuery.where = {};
		}
		advQuery.where["eventID"] = params.eventID;
		flag = true;
	}

	advQuery.include = [];

	if (advQuery.includeModels && advQuery.includeModels.includes("Time")) {
		advQuery.include.push({
			model: Time,
			attributes: ["timeID", "startTime", "endTime"],
		});
	}

	if (advQuery.includeModels && advQuery.includeModels.includes("Event")) {
		advQuery.include.push({
			model: Event,
		});
	}
	if (advQuery.includeModels && advQuery.includeModels.includes("Facility")) {
		advQuery.include.push({
			model: Facility,
		});
	}
	//* This segment is added to provide a single user with all the requests for all the facilities under him/her. (Only support for Admin users)
	if (params.svvID && designation === "Admin") {
		advQuery["model"] = Request;

		const facilities = await Facility.findAll({
			where: {
				facilityIncharge: params.svvID,
			},
			include: advQuery,
			order: [[{ model: Request }, "requestTime", "DESC"]],
		}).catch((err) => {
			result.err = err;
		});
		if (result.err) return result;
		result = facilities;
		return result;
	}
	if (!flag) {
		result = [];
		return result;
	}

	const requests = await Request.findAll(advQuery).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	result = requests;
	return result;
};

exports.getOne = async (svvID, params, advQuery) => {
	let result = {};
	if (params.facilityID) {
		const facility = await Facility.findByPk(params.facilityID);
		if (!facility) {
			result.message = `Facility not found with ID : ${params.facilityID}`;
			result.statusCode = 404;
			return result;
		}
		if (facility.facilityIncharge !== svvID) {
			result.message = `User ${svvID} is not authorized to access this route.`;
			result.statusCode = 401;
			return result;
		}

		if (!advQuery.where) {
			advQuery.where = {};
		}
		advQuery.where["facilityID"] = params.facilityID;
	} else if (params.eventID) {
		const event = await Event.findByPk(params.eventID);
		if (!event) {
			result.message = `Event not found with ID : ${params.eventID}`;
			result.statusCode = 404;
			return result;
		}
		if (event.eventIncharge !== svvID) {
			result.message = `User ${svvID} is not authorized to access this route.`;
			result.statusCode = 401;
			return result;
		}

		if (!advQuery.where) {
			advQuery.where = {};
		}
		advQuery.where["eventID"] = params.eventID;
	}

	advQuery.include = [];

	if (advQuery.includeModels && advQuery.includeModels.includes("Time")) {
		advQuery.include.push({
			model: Time,
			attributes: ["timeID", "startTime", "endTime"],
		});
	}

	if (advQuery.includeModels && advQuery.includeModels.includes("Event")) {
		advQuery.include.push({
			model: Event,
		});
	}
	if (advQuery.includeModels && advQuery.includeModels.includes("Facility")) {
		advQuery.include.push({
			model: Facility,
		});
	}

	const request = await Request.findByPk(params.requestID, advQuery).catch(
		(err) => {
			result.err = err;
		}
	);
	if (result.err) return result;

	if (!request) {
		result.message = `Request not found with ID : ${params.requestID}`;
		result.statusCode = 404;
		return result;
	}
	result = request;
	return result;
};

exports.addOne = async (svvID, params, body) => {
	let result = {};
	const event = await Event.findByPk(params.eventID);
	if (!event) {
		result.message = `Event not found with ID : ${params.eventID}`;
		result.statusCode = 404;
		return result;
	}
	if (event.eventIncharge !== svvID) {
		result.message = `User ${svvID} is not authorized to access this route.`;
		result.statusCode = 401;
		return result;
	}
	const {
		facilityID,
		requestSlotDate,
		requestSlotFrom,
		requestSlotTill,
	} = body;

	const request = await Request.create({
		eventID: params.eventID,
		facilityID,
		requestSlotDate,
		requestSlotFrom,
		requestSlotTill,
	}).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	if (body.timeSchedule) {
		await request.addTimes(body.timeSchedule).catch((err) => {
			result.err = err;
		});
		if (result.err) return result;
	}

	result = request;
	return result;
};

exports.updateOne = async (svvID, params, requestStatus) => {
	let result = {};
	const facility = await Facility.findByPk(params.facilityID);
	if (!facility) {
		result.message = `Facility not found with ID : ${params.facilityID}`;
		result.statusCode = 404;
		return result;
	}
	if (facility.facilityIncharge !== svvID) {
		result.message = `User ${svvID} is not authorized to access this route.`;
		result.statusCode = 401;
		return result;
	}

	const request = await Request.findByPk(params.requestID);
	if (!request) {
		result.message = `Request not found with ID : ${params.requestID}`;
		result.statusCode = 404;
		return result;
	}
	const updatedRequest = request.update({ requestStatus }).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	result = updatedRequest;
	return result;
};

exports.deleteOne = async (svvID, eventID, requestID) => {
	let result = {};
	const event = await Event.findByPk(eventID);
	if (!event) {
		result.message = `Event not found with ID : ${eventID}`;
		result.statusCode = 404;
		return result;
	}
	if (event.eventIncharge !== svvID) {
		result.message = `User ${svvID} is not authorized to access this route.`;
		result.statusCode = 401;
		return result;
	}
	const request = await Request.findByPk(requestID);
	if (!request) {
		result.message = `Request not found with ID : ${requestID}`;
		result.statusCode = 404;
		return result;
	}
	await request.destroy().catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	return result;
};
