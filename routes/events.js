const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	getEvents,
	getEvent,
	addEvent,
	updateEvent,
} = require("../controllers/events");

//* Importing advanceResults middleware
const advanceResults = require("../middleware/advancedResults");

//* Importing middleware to protect routes
const { protect, authorize } = require("../middleware/auth");

router
	.route("/")
	.get(protect, advanceResults(), getEvents)
	.post(protect, authorize("Staff", "Admin"), addEvent);
router
	.route("/:eventID")
	.get(protect, advanceResults(), getEvent)
	.put(protect, authorize("Staff", "Admin"), updateEvent);

module.exports = router;
