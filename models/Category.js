const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Category = sequelize.define("Category", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	color: {
		type: DataTypes.STRING(7),
		allowNull: true,
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: -1,
		references: {
			model: "User",
			key: "id",
		}
	}
}, {
	timestamps: false,
	tableName: "categories",
});

module.exports = Category;