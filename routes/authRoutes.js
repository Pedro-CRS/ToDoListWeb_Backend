const express = require("express");
const { register, login, verifyToken } = require("../controllers/authController");

const router = express.Router();

router.post("/register", verifyToken, register);
router.post("/login", verifyToken, login);

router.get('/protected', verifyToken, (req, res) => {
	res.json({ message: 'Você tem acesso a esta rota protegida!', user: req.user });
});

module.exports = router;