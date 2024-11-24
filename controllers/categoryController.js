const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.findAll();
		res.status(200).json(categories);
	} catch (error) {
		console.error("Erro ao buscar categorias:", error);
		res.status(500).json({ error: "Erro ao buscar categorias" });
	}
};

exports.createCategory = async (req, res) => {
	const { title, color } = req.body;

	try {
		if (!title) {
			return res.status(400).json({ message: "O campo 'title' é obrigatório." });
		}

		const newCategory = await Category.create({ title, color });

		res.status(201).json(newCategory);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};