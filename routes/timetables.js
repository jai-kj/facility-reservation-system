const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	getTimeTable,
	getWeeklyTimeTable,
} = require("../controllers/timetables");

//* Importing middleware to protect routes
const { protect } = require("../middleware/auth");

router.route("/:date").get(protect, getTimeTable);
router.route("/weekly/:date").get(protect, getWeeklyTimeTable);

module.exports = router;
