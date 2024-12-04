const Category = require("../models/Category");
const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
	const userId = req.query?.user_id || 0;

	try {
		const tasks = await Task.findAll({
			where: {
				user_id: userId
			},
			attributes: { exclude: ["category_id"] },
			include: {
				model: Category,
				attributes: ["title", "id", "color"]
			},
			order: [["id", "ASC"]]
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

exports.getTaskById = async (req, res) => {
	const { id } = req.params;

	try {
		const task = await Task.findOne({
			where: { id },
			include: [{ model: Category, as: "Category", attributes: ["id", "title"] }],
		});

		if (!task) {
			return res.status(404).json({ error: "Tarefa não encontrada." });
		}

		res.json(task);
	} catch (error) {
		res.status(500).json({ error: "Erro ao buscar tarefa." });
	}
};

exports.updateTask = async (req, res) => {
	const { id } = req.params;
	const { title, category_id } = req.body;

	try {
		const task = await Task.findByPk(id);

		if (!task) {
			return res.status(404).json({ error: "Tarefa não encontrada" });
		}

		task.title = title;
		task.category_id = category_id;
		await task.save();

		res.json({ message: "Tarefa atualizada com sucesso.", task });
	} catch (error) {
		res.status(500).json({ error: "Erro ao atualizar tarefa." });
	}
};

exports.toggleTaskCompletion = async (req, res) => {
	const { id } = req.params;
	const { isCompleted } = req.body;

	try {
		const task = await Task.findByPk(id);

		if (!task)
			return res.status(404).json({ error: "Tarefa não encontrada." });

		task.isCompleted = isCompleted;
		await task.save();

		res.json({ message: "Tarefa atualizada com sucesso.", task });
	} catch (error) {
		res.status(500).json({ error: "Erro ao atualizar o status da tarefa." });
	}
};