const express = require("express");
const router = express.Router();

const {
	getEvents,
	getEvent,
	addEvent,
	updateEvent
} = require("../controllers/events");

//* Importing advanceResults middleware
const advanceResults = require("../middleware/advancedResults");
router
	.route("/")
	.get(advanceResults(), getEvents)
	.post(addEvent);
router
	.route("/:eventID")
	.get(getEvent)
	.put(updateEvent);

module.exports = router;
