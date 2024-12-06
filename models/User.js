const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define("users", {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password_hash: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	is_active: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
}, {
	timestamps: false,
});

module.exports = User;