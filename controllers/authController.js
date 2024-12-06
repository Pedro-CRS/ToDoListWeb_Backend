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

		const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
		res.json({ token, userId: user.id, userName: user.name });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log("Middleware executado", authHeader, req.headers);

	if (!authHeader) {
		console.log("Token não fornecido");
		return res.status(401).json({ message: "Token não fornecido" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;

		if (req.path === "/validate-token")
			return res.json({ userId: decoded.id, userName: decoded.name });

		next();
	} catch (error) {
		console.log("Erro ao verificar o token:", error.message);
		return res.status(403).json({ message: "Token inválido ou expirado" });
	}
};