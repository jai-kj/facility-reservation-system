const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	getEvents,
	getEvent,
	addEvent,
	updateEvent,
	deleteEvent,
} = require("../controllers/events");

//* Importing advanceResults middleware
const advanceResults = require("../middleware/advancedResults");

//* Importing middleware to protect routes
const { protect, authorize } = require("../middleware/auth");

//* Include other resource routes
const requestRouter = require("./requests");

//* Re-routing into other resources
router.use("/:eventID/requests", requestRouter);

router
	.route("/")
	.get(protect, advanceResults(), getEvents)
	.post(protect, authorize("Staff", "Admin"), addEvent);
router
	.route("/:eventID")
	.get(protect, advanceResults(), getEvent)
	.put(protect, authorize("Staff", "Admin"), updateEvent)
	.delete(protect, authorize("Staff", "Admin"), deleteEvent);

module.exports = router;
