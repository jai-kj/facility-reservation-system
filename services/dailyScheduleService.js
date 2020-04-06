const asyncHandler = require("../middleware/async");
const Time = require("../db/models/Time");
const Facility = require("../db/models/Facility");
const DailySchedule = require("../db/models/DailySchedule");
const Mapper = require("../db/models/Mapper");
const { getOne: getOneFacility } = require("./facilityService");

exports.getAll = asyncHandler(async (advQuery) => {
	let result = {};
	const mappers = await Mapper.findAll({
		where: advQuery.where,
		attributes: { exclude: ["facilityID"] },
		include: {
			model: Time,
		},
	}).catch((err) => {
		result.err = err;
		return result;
	});
	result = mappers;
	return result;
});

exports.addOne = asyncHandler(async (svvID, facilityID, body) => {
	let result = {};
	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		result.message = `Facility not found with ID :${facilityID}`;
		result.statusCode = 404;
		return result;
	}
	if (facility.facilityIncharge !== svvID) {
		result.message = `User ${svvID} is not authorized to access this route.`;
		result.statusCode = 401;
		return result;
	}

	const days = Object.keys(body.schedules);
	console.log("exports.addOne -> days", days);
	const mapperArr = days.map((day) => {
		let obj = {};
		(obj.day = day),
			(obj.facilityID = facilityID),
			(obj.time = body.schedules[day]);
		return obj;
	});
	// console.log(mapperArr);

	for (let index = 0; index < mapperArr.length; index++) {
		let mapper = await Mapper.create(mapperArr[index]).catch((err) => {
			result.err = err;
			return result;
		});
		await mapper.addTimes(mapperArr[index].time).catch((err) => {
			result.err = err;
			return result;
		});
	}

	result = await getOneFacility(facilityID, { includeModels: "Time" });
	return result;
});

exports.updateOne = asyncHandler(async (svvID, facilityID, body) => {
	let result = {};
	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		result.message = `Facility not found with ID :${facilityID}`;
		result.statusCode = 404;
		return result;
	}
	if (facility.facilityIncharge !== svvID) {
		result.message = `User ${svvID} is not authorized to access this route.`;
		result.statusCode = 401;
		return result;
	}

	const updateDays = Object.keys(body.schedules);

	const mapperArr = updateDays.map((day) => {
		let obj = {};
		(obj.day = day),
			(obj.facilityID = facilityID),
			(obj.time = body.schedules[day]);
		return obj;
	});

	const existingMappers = await Mapper.findAll({ where: { facilityID } }).catch(
		(err) => {
			result.err = err;
			return result;
		}
	);

	for (let index = 0; index < mapperArr.length; index++) {
		if (
			existingMappers.map((mapper) => mapper.day).includes(mapperArr[index].day)
		) {
			let oldMapper = existingMappers.filter(
				(eMapper) => eMapper.day === mapperArr[index].day
			)[0];
			await oldMapper.setTimes(mapperArr[index].time).catch((err) => {
				result.err = err;
				return result;
			});
		} else {
			let newMapper = await Mapper.create(mapperArr[index]).catch((err) => {
				result.err = err;
				return result;
			});

			await newMapper.addTimes(mapperArr[index].time).catch((err) => {
				result.err = err;
				return result;
			});
		}
	}

	result = await getOneFacility(facilityID, { includeModels: "Time" });
	return result;
});

exports.deleteOne = asyncHandler(async (svvID, facilityID, advQuery) => {
	let result = {};
	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		result.message = `Facility not found with ID :${facilityID}`;
		result.statusCode = 404;
		return result;
	}
	if (facility.facilityIncharge !== svvID) {
		result.message = `User ${svvID} is not authorized to access this route.`;
		result.statusCode = 401;
		return result;
	}

	const mappers = await Mapper.destroy(advQuery).catch((err) => {
		result.err = err;
		return result;
	});

	result = await getOneFacility(facilityID, { includeModels: "Time" });
	return result;
});
