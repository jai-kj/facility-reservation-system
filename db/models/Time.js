const sequelize = require("sequelize");
const db = require("../../config/db");

class Time extends sequelize.Model {}

Time.init(
	{
		timeID: {
			type: sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true
		},
		startTime: {
			type: sequelize.TIME,
			allowNull: false
		},
		endTime: {
			type: sequelize.TIME,
			allowNull: false
		}
	},
	{
		sequelize: db,
		modelName: "time",
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = Time;
