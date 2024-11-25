const express = require("express");
const { createTask, getTasks, deleteTask, getTaskById, updateTask } = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);

module.exports = router;