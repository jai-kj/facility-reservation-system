const sequelize = require("sequelize");
const db = require("../../config/db");
const Facility = require("./Facility");
const { v4 } = require("uuid");

class Mapper extends sequelize.Model {}

Mapper.init(
	{
		mapperID: {
			type: sequelize.STRING(36),
			primaryKey: true,
			defaultValue: v4()
		},
		facilityID: {
			type: sequelize.STRING(36),
			allowNull: false,
			validate: {
				isUUID: 4
			}
		},
		day: {
			type: sequelize.STRING,
			allowNull: false,
			validate: {
				isAlpha: true,
				isIn: [
					[
						"Sunday",
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday"
					]
				]
			}
		}
	},
	{
		sequelize: db,
		modelName: "mapper",
		freezeTableName: true,
		timestamps: false
	}
);

Mapper.belongsTo(Facility, { foreignKey: "facilityID" });

Facility.hasMany(Mapper, { as: "weeklySchedules", foreignKey: "facilityID" });

module.exports = Mapper;
