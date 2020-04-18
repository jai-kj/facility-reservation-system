const sequelize = require("sequelize");
const Op = sequelize.Op;

const Event = require("../db/models/Event");
const User = require("../db/models/User");
const Request = require("../db/models/Request");

exports.getAll = async (advQuery) => {
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

	const events = await Event.findAll(advQuery).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	return events;
};
exports.getOne = async (eventID, advQuery) => {
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
};
exports.addOne = async (svvID, eventData) => {
	let result = {};
	eventData["eventIncharge"] = svvID;
	const event = await Event.create(eventData).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	result = event;
	return result;
};
exports.updateOne = async (svvID, eventID, updateData) => {
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
};

exports.deleteOne = async (svvID, eventID) => {
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
};

exports.getCommittees = async () => {
	let result = {};

	const committees = await Event.aggregate("eventUnder", "DISTINCT", {
		plain: false,
	}).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	let committeeArr = committees.map((committee) => Object.values(committee)[0]);
	result.committees = committeeArr;
	return result;
};
