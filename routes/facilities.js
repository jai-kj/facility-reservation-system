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

router
	.route("/")
	.get(protect, advancedResults(), getFacilities)
	.post(protect, authorize("Admin"), addFacility);
router
	.route("/:facilityID")
	.get(protect, advancedResults(), getFacility)
	.put(protect, authorize("Admin"), updateFacility);

module.exports = router;
