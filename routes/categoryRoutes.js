const express = require("express");
const { createCategory, getCategories } = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);

module.exports = router;