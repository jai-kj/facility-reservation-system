const express = require("express");
const router = express.Router();
const {
	getFacilities,
	getFacility,
	updateFacility
} = require("../controllers/facilities");

const advancedResults = require("../middleware/advancedResults");

router.route("/").get(advancedResults(), getFacilities);
router
	.route("/:facilityID")
	.get(getFacility)
	.put(updateFacility);

module.exports = router;
