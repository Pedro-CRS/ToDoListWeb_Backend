const express = require("express");
const { register, login, verifyToken } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/validateToken", verifyToken, (req, res) => {
	res.json({
		userId: req.user.id,
		userName: req.user.userName
	});
});

module.exports = router;