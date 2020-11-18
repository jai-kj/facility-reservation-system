const sequelize = require("sequelize");
const User = require("./User");
const db = require("../../config/db");
const { v4 } = require("uuid");

class Event extends sequelize.Model {}

Event.init(
	{
		eventID: {
			type: sequelize.STRING(36),
			primaryKey: true,
		},
		eventName: {
			type: sequelize.STRING(500),
			allowNull: false,
		},
		eventDescription: {
			type: sequelize.TEXT("medium"),
			allowNull: true,
		},
		eventUnder: {
			type: sequelize.STRING(255),
			allowNull: true,
			validate: {
				isAlpha: true,
			},
		},
	},
	{
		sequelize: db,
		modelName: "event",
		freezeTableName: true,
		timestamps: false,
		hooks: {
			beforeCreate: (event) => {
				event.eventID = v4();
			},
			beforeBulkCreate: (events) => {
				events.forEach((event) => {
					if (!event.eventID) event.eventID = v4();
				});
			},
		},
	}
);

Event.belongsTo(User, { as: "incharge", foreignKey: "eventIncharge" });

User.hasMany(Event, { foreignKey: "eventIncharge" });

module.exports = Event;
