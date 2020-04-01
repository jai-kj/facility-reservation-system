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
		let queryStr = reqQuery.filter;

		// Create operators ($gt], $gte, etc)
		queryStr = queryStr.replace(
			/\b(gt|gte|lt|lte|in|eq|ne|not|between)\b/g,
			match => `$${match}`
		);
		const filterObj = JSON.parse(queryStr);

		advQuery.where = filterObj;
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

	req.advQuery = advQuery;

	next();
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
