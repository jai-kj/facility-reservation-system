const sequelize = require("sequelize");
const User = require("./User");
const db = require("../../config/db");
const { v4 } = require("uuid");

class Facility extends sequelize.Model {}

Facility.init(
	{
		facilityID: {
			type: sequelize.STRING(36),
			primaryKey: true,
		},
		facilityType: {
			type: sequelize.STRING,
			allowNull: false,
			validate: {
				isAlpha: true,
				isIn: [["Lab", "Class", "Hall", "Sport"]],
			},
		},
		facilityName: {
			type: sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isAlphanumeric: true,
			},
		},
		facilityIncharge: {
			type: sequelize.STRING(50),
			allowNull: false,
			validate: {
				is: /^[a-zA-Z]+\.?[a-zA-Z]*$/,
			},
		},
		facilityStartTime: {
			type: sequelize.TIME,
			allowNull: false,
		},
		facilityEndTime: {
			type: sequelize.TIME,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		modelName: "facility",
		freezeTableName: true,
		timestamps: false,
		hooks: {
			beforeCreate: async (facility) => {
				facility.facilityID = v4();
			},
		},
	}
);

Facility.belongsTo(User, { as: "incharge", foreignKey: "facilityIncharge" });

User.hasMany(Facility, { foreignKey: "facilityIncharge" });

module.exports = Facility;
