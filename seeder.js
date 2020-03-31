//? To import data in Database from .json files in '_data' folder
//? Run `$ node seeder -i`

const fs = require("fs");
const colors = require("colors");

const db = require("./config/db");

const {
	User,
	Facility,
	Event,
	Time,
	Request,
	Mapper,
	DailySchedule,
	RequestSchedule
} = require("./db/models");

const users = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);
const events = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/events.json`, "utf-8")
);
const facilities = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/facilities.json`, "utf-8")
);
const mappers = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/mappers.json`, "utf-8")
);
const requests = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/requests.json`, "utf-8")
);
const time = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/time.json`, "utf-8")
);
const dailySchedules = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/dailySchedules.json`, "utf-8")
);
const requestSchedule = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/requestSchedules.json`, "utf-8")
);

//* Import data into DB
const importData = async () => {
	try {
		await User.bulkCreate(users);
		await Time.bulkCreate(time);
		await Event.bulkCreate(events);
		await Facility.bulkCreate(facilities);
		await Request.bulkCreate(requests);
		await RequestSchedule.bulkCreate(requestSchedule);
		await Mapper.bulkCreate(mappers);
		await DailySchedule.bulkCreate(dailySchedules);

		console.log("Data imported.....".green.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

if (process.argv[2] === "-i") {
	importData();
}
