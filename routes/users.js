const express = require("express");

const router = express.Router();

const { getUsers, getUser } = require("../controllers/users");

//* Importing middleware to protect routes
const { protect, authorize } = require("../middleware/auth");

//* Importing advanced filtering middleware
const advancedResults = require("../middleware/advancedResults");

//* Include other resource routes
const eventRouter = require("./events");
const facilitiesRouter = require("./facilities");
const requestRouter = require("./requests");

//* Re-routing into other resources
router.use("/:svvID/events", eventRouter);
router.use("/:svvID/facilities", facilitiesRouter);
router.use("/:svvID/requests", requestRouter);

router.route("/").get(protect, advancedResults(), getUsers);
router.route("/:svvID").get(protect, advancedResults(), getUser);

module.exports = router;
