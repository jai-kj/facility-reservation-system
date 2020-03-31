const { Event } = require("../db/models/index");
const asyncHandler = require("../middleware/async");

exports.getAll = asyncHandler(async () => {
	const events = await Event.findAll();
	return events;
});
exports.getOne = asyncHandler(async eventID => {
	const event = await Event.findByPk(eventID);
	return event;
});
exports.addOne = asyncHandler(async eventData => {
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
