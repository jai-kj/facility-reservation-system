const sequelize = require("sequelize");
const db = require("../../config/db");
const { Request, Time } = require("./index");
class RequestSchedule extends sequelize.Model {}

RequestSchedule.init(
	{
		requestID: {
			type: sequelize.STRING(36),
			allowNull: false,
			validate: {
				isUUID: 4
			}
		},
		timeID: {
			type: sequelize.INTEGER(11),
			allowNull: false,
			validate: {
				isNumeric: true
			}
		}
	},
	{
		sequelize: db,
		modelName: "request_schedule",
		freezeTableName: true,
		timestamps: false
	}
);

Request.belongsToMany(Time, {
	through: RequestSchedule,
	foreignKey: "requestID",
	otherKey: "timeID"
});

Time.belongsToMany(Request, {
	through: RequestSchedule,
	foreignKey: "timeID",
	otherKey: "requestID"
});

module.exports = RequestSchedule;
