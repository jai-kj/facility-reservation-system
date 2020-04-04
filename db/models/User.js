const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

class User extends sequelize.Model {}
User.init(
	{
		svvID: {
			type: sequelize.STRING(50),
			primaryKey: true,
			validate: {
				is: {
					args: /^[a-zA-Z]+\.?[a-zA-Z]*$/,
					msg: "Please provide valid SVV ID",
				},
			},
		},
		password: {
			type: sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: sequelize.STRING,
			allowNull: false,
			validate: {
				is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			},
		},
		designation: {
			type: sequelize.STRING,
			allowNull: false,
			validate: {
				isAlpha: {
					msg: "Please provide a single word designation",
				},
				isIn: {
					args: [["Admin", "Staff", "Student"]],
					msg: "Please provide valid designation Student or Staff or Admin",
				},
			},
		},
	},
	{
		sequelize: db,
		modelName: "user",
		freezeTableName: true,
		timestamps: false,
		hooks: {
			beforeCreate: async (user) => {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(user.password, salt);
			},
		},
		defaultScope: {
			attributes: { exclude: ["password"] },
		},
		scopes: {
			withPwd: {
				attributes: { include: ["password"] },
			},
		},
	}
);
/*
* Instance method to compare the password provided by user with the one in database
  @params "*" enteredPassword : password entered by the user
*/
User.prototype.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

/*
 * Instance method to sign JWT token to send in response
 */
User.prototype.getSignedJWTToken = function () {
	return jwt.sign(
		{ svvID: this.svvID, designation: this.designation },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRE,
		}
	);
};

module.exports = User;
