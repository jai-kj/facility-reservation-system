const express = require("express");
const {
	getEvents,
	getEvent,
	addEvent,
	updateEvent
} = require("../controllers/events");

const router = express.Router();

router
	.route("/")
	.get(getEvents)
	.post(addEvent);
router
	.route("/:eventID")
	.get(getEvent)
	.put(updateEvent);

module.exports = router;
