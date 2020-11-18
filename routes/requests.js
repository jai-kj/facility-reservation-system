const express = require("express");
const router = express.Router({ mergeParams: true });
const {
	getRequests,
	getRequest,
	addRequest,
	updateRequest,
	deleteRequest,
} = require("../controllers/requests");

//* Importing advanceResults middleware
const advancedResults = require("../middleware/advancedResults");

//* Importing middleware to protect routes
const { protect, authorize } = require("../middleware/auth");

router
	.route("/")
	.get(protect, authorize("Staff", "Admin"), advancedResults(), getRequests)
	.post(protect, authorize("Staff", "Admin"), addRequest);

router
	.route("/:requestID")
	.get(protect, authorize("Staff", "Admin"), advancedResults(), getRequest)
	.put(protect, authorize("Admin"), updateRequest)
	.delete(protect, authorize("Staff", "Admin"), deleteRequest);

module.exports = router;
