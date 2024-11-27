const express = require("express");
const { createCategory, getCategories } = require("../controllers/categoryController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

router.get("/", verifyToken, getCategories);
router.post("/", verifyToken, createCategory);

module.exports = router;