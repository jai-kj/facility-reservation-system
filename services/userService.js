const asyncHandler = require("../middleware/async");
const User = require("../db/models/User");
const Event = require("../db/models/Event");
const Facility = require("../db/models/Facility");

exports.getAll = asyncHandler(async (advQuery) => {
	advQuery.include = [];

	if (advQuery.includeModels && advQuery.includeModels.includes("Event")) {
		advQuery.include.push({
			model: Event,
			attributes: { exclude: ["eventIncharge"] },
		});
	}
	if (advQuery.includeModels && advQuery.includeModels.includes("Facility")) {
		advQuery.include.push({
			model: Facility,
			attributes: ["facilityID", "facilityName", "facilityType"],
		});
	}

	const users = await User.findAll(advQuery);
	return users;
});

exports.getOne = asyncHandler(async (svvID, advQuery) => {
	advQuery.include = [];

	if (advQuery.includeModels && advQuery.includeModels.includes("Event")) {
		advQuery.include.push({
			model: Event,
			attributes: { exclude: ["eventIncharge"] },
		});
	}
	if (advQuery.includeModels && advQuery.includeModels.includes("Facility")) {
		advQuery.include.push({
			model: Facility,
			attributes: ["facilityID", "facilityName", "facilityType"],
		});
	}

	const user = await User.findByPk(svvID, advQuery);
	return user;
});
