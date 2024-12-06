const express = require("express");
const { register, login, verifyToken } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/validateToken", verifyToken, (req, res) => {
	const authHeader = req.headers.authorization;

	if (!authHeader)
		return res.status(401).json({ message: "Token não fornecido" });

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		res.json({ userId: decoded.id, userName: decoded.name });
	} catch (error) {
		return res.status(403).json({ message: "Token inválido ou expirado" });
	}
});

module.exports = router;