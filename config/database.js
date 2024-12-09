const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
	logging: false,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false, // Necessário para conectar ao Neon
		},
	},
});

module.exports = { sequelize };