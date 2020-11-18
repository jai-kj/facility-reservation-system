const sequelize = require("sequelize");
const Op = sequelize.Op;
const moment = require("moment");
const Facility = require("../db/models/Facility");
const Mapper = require("../db/models/Mapper");
const DailySchedule = require("../db/models/DailySchedule");
const Time = require("../db/models/Time");
const Request = require("../db/models/Request");
const RequestSchedule = require("../db/models/RequestSchedule");

exports.timetable = async (facilityID, date) => {
	let result = {};
	const facility = await Facility.findByPk(facilityID);
	if (!facility) {
		result.message = `Facility not found with ID : ${facilityID}`;
		result.statusCode = 404;
		return result;
	}
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
	const bookedSlots = {};
	bookedEventSchedules.map((bookedEvent) => {
		bookedEvent.times.map((time) => {
			bookedSlots[time.dataValues.timeID] = bookedEvent.eventID;
		});
	});
	const bookedSlotsTimeArrStr = Object.keys(bookedSlots);

	const bookedSlotsTimeArr = bookedSlotsTimeArrStr.map((time) =>
		parseInt(time)
	);

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
	availableSlotsArr = difference(
		availableSlotsArr,
		new Set(bookedSlotsTimeArr)
	);

	//* Converting Array from Set object
	availableSlotsArr = Array.from(availableSlotsArr);

	let finalSchedule = [];
	for (let i = 0; i < facilitySlots.length; i++) {
		let obj = {};
		let timeInstance = await Time.findByPk(facilitySlots[i]);
		if (scheduledSlots.includes(facilitySlots[i])) {
			obj = {
				timeID: facilitySlots[i],
				startTime: timeInstance.startTime,
				endTime: timeInstance.endTime,
				status: "Reserved",
			};
		} else if (bookedSlotsTimeArr.includes(facilitySlots[i])) {
			obj = {
				timeID: facilitySlots[i],
				startTime: timeInstance.startTime,
				endTime: timeInstance.endTime,
				status: "Event",
				event: bookedSlots[facilitySlots[i]],
			};
		} else if (availableSlotsArr.includes(facilitySlots[i])) {
			obj = {
				timeID: facilitySlots[i],
				startTime: timeInstance.startTime,
				endTime: timeInstance.endTime,
				status: "Vacant",
			};
		}

		finalSchedule.push(obj);
	}

	result = finalSchedule;
	return result;
};

exports.weeklyTimetable = async (facilityID, week) => {
	let result = {};
	const date = week.split("_");
	if (date.length !== 2) {
		result.message = `Please provide date range separated by '_' operator.`;
		result.statusCode = 400;
		return result;
	}
	let start = date[0];
	let end = date[1];
	let Timetable = {};
	for (let d = moment(start); d.diff(end, "days") <= 0; d.add(1, "days")) {
		let obj = {};
		let schedule = await this.timetable(facilityID, d.format("YYYY-MM-DD"));
		if (schedule.message) {
			result.message = schedule.message;
			result.statusCode = schedule.message;
			return result;
		}
		if (schedule.err) {
			result.err = schedule.err;
			return result;
		}
		Timetable[d.format("dddd")] = schedule;
	}

	result = Timetable;
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
