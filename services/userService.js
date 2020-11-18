const User = require("../db/models/User");
const Event = require("../db/models/Event");
const Facility = require("../db/models/Facility");

exports.getAll = async (advQuery) => {
	let result = {};
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

	const users = await User.findAll(advQuery).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	return users;
};

exports.getOne = async (svvID, advQuery) => {
	let result = {};
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

	const user = await User.findByPk(svvID, advQuery).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	if (!user) {
		result.message = `User not found with ID :${svvID}`;
		result.statusCode = 404;
		return result;
	}

	return user;
};
