const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	getAvailTime,
	getDailyScheduleSlots,
} = require("../controllers/timeSlots.js");

//* Importing advanceResults middleware
const advancedResults = require("../middleware/advancedResults");

//* Importing middleware to protect routes
const { protect, authorize } = require("../middleware/auth");

router.route("/:date").get(protect, authorize("Staff", "Admin"), getAvailTime);
router
	.route("/")
	.get(protect, authorize("Staff", "Admin"), getDailyScheduleSlots);

module.exports = router;
