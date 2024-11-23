const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			name,
			email,
			password_hash: hashedPassword,
		});

		res.status(201).json({ message: "Usuário criado com sucesso!" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user || !(await bcrypt.compare(password, user.password_hash))) {
			return res.status(401).json({ message: "Credenciais inválidas" });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
		res.json({ message: "Login bem-sucedido", token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};