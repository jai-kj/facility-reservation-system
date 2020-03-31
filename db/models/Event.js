const sequelize = require("sequelize");
const { User } = require("./");
const db = require("../../config/db");
const { v4 } = require("uuid");

class Event extends sequelize.Model {}

Event.init(
	{
		eventID: {
			type: sequelize.STRING(36),
			primaryKey: true,
			defaultValue: v4()
		},
		eventName: {
			type: sequelize.STRING(500),
			allowNull: false
		},
		eventDescription: {
			type: sequelize.TEXT("medium"),
			allowNull: true
		},
		eventIncharge: {
			type: sequelize.STRING(50),
			allowNull: false,
			validate: {
				is: /^[a-zA-Z]+\.?[a-zA-Z]*$/
			}
		},
		eventUnder: {
			type: sequelize.STRING(255),
			allowNull: true,
			validate: {
				isAlpha: true
			}
		}
	},
	{
		sequelize: db,
		modelName: "event",
		freezeTableName: true,
		timestamps: false
	}
);

Event.belongsTo(User, { as: "Incharge", foreignKey: "eventIncharge" });

User.hasMany(Event, { foreignKey: "eventIncharge" });

module.exports = Event;
