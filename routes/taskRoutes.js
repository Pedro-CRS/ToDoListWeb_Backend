const express = require("express");
const { createTask, getTasks, deleteTask, getTaskById, updateTask, toggleTaskCompletion } = require("../controllers/taskController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.delete("/:id", verifyToken, deleteTask);
router.get("/:id", verifyToken, getTaskById);
router.put("/:id", verifyToken, updateTask);
router.patch("/:id/completed", verifyToken, toggleTaskCompletion);

module.exports = router;