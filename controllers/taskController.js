const Category = require("../models/Category");
const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.findAll({
			attributes: { exclude: ["category_id"] },
			include: {
				model: Category,
				attributes: ["title", "id", "color"]
			}
		});
		res.status(200).json(tasks);
	} catch (error) {
		console.error("Erro ao buscar tarefas:", error);
		res.status(500).json({ error: "Erro ao buscar tarefas:" });
	}
};

exports.createTask = async (req, res) => {
	const { userId, title, categoryId, isCompleted } = req.body;

	try {
		if (!userId || !title || !categoryId) {
			return res.status(400).json({ message: "Campos obrigatórios estão faltando" });
		}

		const newTask = await Task.create({
			user_id: userId,
			title,
			category_id: categoryId,
			isCompleted: isCompleted
		});

		res.status(201).json({ message: "Tarefa criada com sucesso", task: newTask });
	} catch (error) {
		console.error("Erro ao criar a tarefa:", error.message);
		res.status(500).json({ message: "Erro ao criar a tarefa", error: error.message });
	}
};

exports.deleteTask = async (req, res) => {
	const { id } = req.params;

	try {
		const task = await Task.findByPk(id);

		if (!task) {
			return res.status(404).json({ error: "Tarefa não encontrada" });
		}

		await task.destroy();
		res.json({ message: "Tarefa excluída com sucesso" });
	} catch (error) {
		res.status(500).json({ error: "Erro ao deletar tarefa" });
	}
};