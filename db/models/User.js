const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const db = require("../../config/db");

class User extends sequelize.Model {}
User.init(
	{
		svvID: {
			type: sequelize.STRING(50),
			primaryKey: true,
			validate: {
				is: /^[a-zA-Z]+\.?[a-zA-Z]*$/
			}
		},
		password: {
			type: sequelize.STRING,
			allowNull: false
		},
		name: {
			type: sequelize.STRING,
			allowNull: false
		},
		email: {
			type: sequelize.STRING,
			allowNull: false,
			validate: {
				is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
			}
		},
		designation: {
			type: sequelize.STRING,
			allowNull: false,
			validate: {
				isAlpha: true,
				isIn: [["Admin", "Staff", "Student"]]
			}
		}
	},
	{
		sequelize: db,
		modelName: "user",
		freezeTableName: true,
		timestamps: false,
		hooks: {
			beforeCreate: async user => {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(user.password, salt);
			}
		}
	}
);

module.exports = User;
