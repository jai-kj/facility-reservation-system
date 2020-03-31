const sequelize = require("sequelize");
const { v4 } = require("uuid");
const { Facility, Event } = require("./");
const db = require("../../config/db");
const moment = require("moment");

class Request extends sequelize.Model {}

Request.init(
	{
		requestID: {
			type: sequelize.STRING(36),
			primaryKey: true,
			defaultValue: v4()
		},
		requestTime: {
			type: sequelize.DATE,
			allowNUll: true,
			get() {
				const time = this.getDataValue("requestTime");
				return moment
					.utc(time)
					.local()
					.format("YYYY-MM-DD HH:MM:SS");
			}
		},
		eventID: {
			type: sequelize.STRING(36),
			allowNull: false,
			validate: {
				isUUID: 4
			}
		},
		facilityID: {
			type: sequelize.STRING(36),
			allowNull: false,
			validate: {
				isUUID: 4
			}
		},
		requestStatus: {
			type: sequelize.STRING,
			allowNull: false,
			defaultValue: "Waiting",
			validate: {
				isIn: [["Waiting", "Alloted", "Canceled"]]
			}
		},
		requestSlotDate: {
			type: sequelize.DATEONLY,
			allowNull: false,
			defaultValue: new Date(Date.now())
		},
		requestSlotFrom: {
			type: sequelize.TIME,
			allowNull: false
		},
		requestSlotTill: {
			type: sequelize.TIME,
			allowNull: false
		}
	},
	{
		sequelize: db,
		modelName: "request",
		freezeTableName: true,
		timestamps: false
	}
);

Request.belongsTo(Event, { foreignKey: "eventID" });

Request.belongsTo(Facility, { foreignKey: "facilityID" });

Event.hasMany(Request, { foreignKey: "eventID" });

Facility.hasMany(Request, { foreignKey: "facilityID" });

module.exports = Request;
