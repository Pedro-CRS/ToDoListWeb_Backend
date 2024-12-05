const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Category = require("./Category");

const Task = sequelize.define("Task", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	category_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	edited_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	isCompleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	completed_at: {
		type: DataTypes.DATE,
		allowNull: true,
	},
}, {
	tableName: "tasks",
	timestamps: false,
});

Task.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Task;