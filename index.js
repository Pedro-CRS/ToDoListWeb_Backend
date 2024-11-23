require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

sequelize
	.authenticate()
	.then(() => console.log("Conexão ao PostgreSQL bem-sucedida!"))
	.catch((err) => console.error("Erro ao conectar ao PostgreSQL:", err));

app.use("/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
	res.send("Bem-vindo à API ToDoList!");
});