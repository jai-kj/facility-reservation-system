const express = require("express");
const router = express.Router({ mergeParams: true });
const {
	getFacilities,
	getFacility,
	updateFacility,
	addFacility,
} = require("../controllers/facilities");

//* Importing advanceResults middleware
const advancedResults = require("../middleware/advancedResults");

//* Importing middleware to protect routes
const { protect, authorize } = require("../middleware/auth");

//* Include other resource routes
const dailyScheduleRouter = require("./dailySchedules");
const requestRouter = require("./requests");

//* Re-routing into other resources
router.use("/:facilityID/dailyschedules", dailyScheduleRouter);
router.use("/:facilityID/requests", requestRouter);

router
	.route("/")
	.get(protect, advancedResults(), getFacilities)
	.post(protect, authorize("Admin"), addFacility);
router
	.route("/:facilityID")
	.get(protect, advancedResults(), getFacility)
	.put(protect, authorize("Admin"), updateFacility);

module.exports = router;
