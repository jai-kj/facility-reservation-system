const sequelize = require("sequelize");
const Op = sequelize.Op;
const advancedResults = () => async (req, res, next) => {
	let advQuery = {};

	let reqQuery = { ...req.query };
	const removeFields = ["select", "offset", "limit", "order", "filter"];

	//* To select which col. to output
	if (reqQuery.select) {
		const fields = reqQuery.select.split(",");
		advQuery.attributes = fields;
	}

	//* To filter results with operators like (<,>,<=,>=,==, != ,etc)
	if (reqQuery.filter) {
		const json = JSON.parse(reqQuery.filter);
		const filterOBJ = mapOperators(json);

		advQuery.where = filterOBJ;
	}

	//* To sort result using col name
	if (reqQuery.order) {
		const orderObj = JSON.parse(reqQuery.order);
		advQuery.order = orderObj;
	}

	//* To mark an offset in results
	if (reqQuery.offset) {
		advQuery.offset = parseInt(reqQuery.offset);
	}

	//* To limit no. of responses
	if (reqQuery.limit) {
		advQuery.limit = parseInt(reqQuery.limit);
	}

	if (reqQuery.include) {
		advQuery.includeModels = reqQuery.include.split(",");
	}

	req.advQuery = advQuery;

	next();
};

//? Function to map keys like [gt,gte,in,...] received from request query to sequelize native operators like [Op.gt,Op.gte,....] : Doing this will maintain security and no deprecation warning will be thrown by sequelize.

const mapOperators = (json) => {
	let tempObj = {};
	let jsonKeys = Object.keys(json);
	let nestedObj = Object.values(json);
	for (let j = 0; j < nestedObj.length; j++) {
		const oldKey = Object.keys(nestedObj[j]);
		const oldValue = Object.values(nestedObj[j]);
		if (oldKey[0] === "gte") {
			tempObj[jsonKeys[j]] = { [Op.gte]: oldValue[0] };
		} else if (oldKey[0] === "lte") {
			tempObj[jsonKeys[j]] = { [Op.lte]: oldValue[0] };
		} else if (oldKey[0] === "lt") {
			tempObj[jsonKeys[j]] = { [Op.lt]: oldValue[0] };
		} else if (oldKey[0] === "gt") {
			tempObj[jsonKeys[j]] = { [Op.gt]: oldValue[0] };
		} else if (oldKey[0] === "eq") {
			tempObj[jsonKeys[j]] = { [Op.eq]: oldValue[0] };
		} else if (oldKey[0] === "ne") {
			tempObj[jsonKeys[j]] = { [Op.ne]: oldValue[0] };
		} else if (oldKey[0] === "not") {
			tempObj[jsonKeys[j]] = { [Op.not]: oldValue[0] };
		} else if (oldKey[0] === "between") {
			tempObj[jsonKeys[j]] = { [Op.between]: oldValue[0] };
		} else if (oldKey[0] === "in") {
			tempObj[jsonKeys[j]] = { [Op.in]: oldValue[0] };
		} else {
			tempObj[jsonKeys[j]] = nestedObj[j];
		}
	}
	return tempObj;
};

module.exports = advancedResults;

//? Example Advanced Query Requests
/*

@ For Events

{{URL}}/events?select=eventName,eventUnder&filter={"eventName":{"in":["Event 1","Event 2"]}}

{{URL}}/events?select=eventName,eventUnder&filter={"eventName":{"not":["Event 1","Event 2"]}}&order=[["eventName","DESC"]]

{{URL}}/events?select=eventName,eventUnder&offset=2&limit=2

@ For Facilities

{{URL}}/facilities?select=facilityName,facilityStartTime,facilityEndTime,facilityType&order=[["facilityName","ASC"]]&filter={"facilityStartTime":{"gte": "09:00"}}
*/
