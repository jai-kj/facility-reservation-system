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
	const event = await Event.findByPk(eventID, advQuery);
	return event;
});
exports.addOne = asyncHandler(async (eventData) => {
	const event = await Event.create(eventData);
	return event;
});
exports.updateOne = asyncHandler(async (eventID, updateData) => {
	const event = await Event.findByPk(eventID);
	if (!event) {
		return event;
	}
	updatedEvent = await event.update(updateData);
	return updatedEvent;
});
