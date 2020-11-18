const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	getDailySchedules,
	addDailySchedules,
	updateDailySchedules,
	deleteDailySchedules,
} = require("../controllers/dailySchedules");

//* Importing advanceResults middleware
const advancedResults = require("../middleware/advancedResults");

//* Importing middleware to protect routes
const { protect, authorize } = require("../middleware/auth");

router
	.route("/")
	.get(protect, advancedResults(), getDailySchedules)
	.post(protect, authorize("Admin"), addDailySchedules)
	.put(protect, authorize("Admin"), updateDailySchedules)
	.delete(protect, authorize("Admin"), advancedResults(), deleteDailySchedules);

module.exports = router;
