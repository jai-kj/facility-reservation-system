const sequelize = require("sequelize");
const Op = sequelize.Op;
const moment = require("moment");
const Facility = require("../db/models/Facility");
const Mapper = require("../db/models/Mapper");
const DailySchedule = require("../db/models/DailySchedule");
const Time = require("../db/models/Time");
const Request = require("../db/models/Request");
const RequestSchedule = require("../db/models/RequestSchedule");

exports.getSlotsAtDate = async (facilityID, date) => {
	let result = {};
	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		result.message = `Facility not found with ID : ${facilityID}`;
		result.statusCode = 404;
		return result;
	}

	//* Getting weekday name from date provided
	const day = moment(date).format("dddd");

	//* Fetching the daily schedule of the facility on the particular day of week
	const dailySchedule = await Mapper.findAll({
		where: {
			facilityID,
			day,
		},
		include: { model: Time },
	});
	let scheduledSlots = [];
	if (dailySchedule.length === 1) {
		//* Creating array of timeIDs
		scheduledSlots = dailySchedule[0].times.map((time) => time.timeID);
	}

	//* Fetching event schedule booked on that particular date and is alloted by admin
	const bookedEventSchedules = await Request.findAll({
		where: {
			facilityID,
			requestSlotDate: date,
			requestStatus: "Alloted",
		},
		include: {
			model: Time,
		},
	});
	//* Creating array of timeIDs from booked event schedule
	const bookedSlots = [];
	bookedEventSchedules.map((bookedEvent) => {
		bookedEvent.times.map((time) => {
			bookedSlots.push(time.dataValues.timeID);
		});
	});

	//* Fetching the timeID of the start and end time of a facility
	const boundarySlots = await Time.findAll({
		where: {
			[Op.or]: [
				{ startTime: facility.facilityStartTime },
				{ endTime: facility.facilityEndTime },
			],
		},
		attributes: ["timeID"],
	});

	//*  Creating array of boundary timeIDs
	const boundarySlotArr = boundarySlots.map((slot) => slot.timeID);

	//*  Creating an array of operable time of facility by inserting ids between start and end time of facility
	const facilitySlots = [];
	for (let i = boundarySlotArr[0]; i <= boundarySlotArr[1]; i++) {
		facilitySlots.push(i);
	}

	//* Available slots for booking will be Facility Operable Time - Scheduled Time - Event Booked Time
	let availableSlotsArr = difference(
		new Set(facilitySlots),
		new Set(scheduledSlots)
	);
	availableSlotsArr = difference(availableSlotsArr, new Set(bookedSlots));

	//* Converting Array from Set object
	availableSlotsArr = Array.from(availableSlotsArr);

	//* Fetching start time and end time of the available slots
	const availableSlots = await Time.findAll({
		where: {
			timeID: availableSlotsArr,
		},
	}).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;
	result = availableSlots;
	return result;
};

exports.getDailySlots = async (svvID, facilityID) => {
	let result = {};
	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		result.message = `Facility not found with ID : ${facilityID}`;
		result.statusCode = 404;
		return result;
	}
	if (facility.facilityIncharge !== svvID) {
		result.message = `User ${svvID} is not authorized to access this route.`;
		result.statusCode = 401;
		return result;
	}

	//* Fetching the timeID of the start and end time of a facility
	const boundarySlots = await Time.findAll({
		where: {
			[Op.or]: [
				{ startTime: facility.facilityStartTime },
				{ endTime: facility.facilityEndTime },
			],
		},
		attributes: ["timeID"],
	});

	//*  Creating array of boundary timeIDs
	const boundarySlotArr = boundarySlots.map((slot) => slot.timeID);

	//*  Creating an array of operable time of facility by inserting ids between start and end time of facility
	const facilitySlots = [];
	for (let i = boundarySlotArr[0]; i <= boundarySlotArr[1]; i++) {
		facilitySlots.push(i);
	}

	//* Fetching start time and end time of the available slots
	const dailySlots = await Time.findAll({
		where: {
			timeID: facilitySlots,
		},
	}).catch((err) => {
		result.err = err;
	});
	if (result.err) return result;

	result = dailySlots;
	return result;
};

/* 
* difference function to find the difference between sets
  @params (*) setA : To perform set operation (setA - setB)
  @params (*) setB : To perform set operation (setA - setB)
*/

const difference = (setA, setB) => {
	let _difference = new Set(setA);
	for (let elem of setB) {
		_difference.delete(elem);
	}
	return _difference;
};
