const sequelize = require("sequelize");
const Op = sequelize.Op;
const asyncHandler = require("../middleware/async");

const Event = require("../db/models/Event");
const User = require("../db/models/User");
const Request = require("../db/models/Request");

exports.getAll = asyncHandler(async (advQuery) => {
	advQuery.include = [];

	if (advQuery.includeModels && advQuery.includeModels.includes("Request")) {
		advQuery.include.push({
			model: Request,
		});
	}
	if (advQuery.includeModels && advQuery.includeModels.includes("User")) {
		advQuery.include.push({
			model: User,
			as: "incharge",
			attributes: ["svvID", "name", "email", "designation"],
		});
	}

	const events = await Event.findAll(advQuery);
	return events;
});
exports.getOne = asyncHandler(async (eventID, advQuery) => {
	let result = {};
	advQuery.include = [];

	if (advQuery.includeModels && advQuery.includeModels.includes("Request")) {
		advQuery.include.push({
			model: Request,
		});
	}
	if (advQuery.includeModels && advQuery.includeModels.includes("User")) {
		advQuery.include.push({
			model: User,
			as: "incharge",
			attributes: ["svvID", "name", "email", "designation"],
		});
	}
	const event = await Event.findByPk(eventID, advQuery).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	if (!event) {
		result.message = `Event not found with ID : ${eventID}`;
		result.statusCode = 404;
		return result;
	}
	result = event;
	return result;
});
exports.addOne = asyncHandler(async (svvID, eventData) => {
	let result = {};
	eventData["eventIncharge"] = svvID;
	const event = await Event.create(eventData).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	result = event;
	return result;
});
exports.updateOne = asyncHandler(async (svvID, eventID, updateData) => {
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
	updatedEvent = await event.update(updateData);
	result = updatedEvent;
	return result;
});

exports.deleteOne = asyncHandler(async (svvID, eventID) => {
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

	await event.destroy().catch((err) => {
		result.err = err;
	});
	if (result.err) return result;
	return result;
});
