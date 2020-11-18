const sequelize = require("sequelize");
const db = require("../../config/db");
const Mapper = require("./Mapper");
const Time = require("./Time");

class DailySchedule extends sequelize.Model {}

DailySchedule.init(
	{
		mapperID: {
			type: sequelize.STRING(36),
			allowNUll: false,
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
		modelName: "daily_schedule",
		freezeTableName: true,
		timestamps: false
	}
);

Mapper.belongsToMany(Time, {
	through: DailySchedule,
	foreignKey: "mapperID",
	otherKey: "timeID"
});

Time.belongsToMany(Mapper, {
	through: DailySchedule,
	foreignKey: "timeID",
	otherKey: "mapperID"
});

module.exports = DailySchedule;
