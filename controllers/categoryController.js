const Category = require("../models/Category");
const { Op } = require("sequelize");

exports.getCategories = async (req, res) => {
	const userId = req.query?.user_id || 0;

	try {
		const categories = await Category.findAll({
			where: {
				[Op.or]: [
					{ user_id: -1 },
					{ user_id: userId }
				]
			}
		});
		res.status(200).json(categories);
	} catch (error) {
		console.error("Erro ao buscar categorias:", error);
		res.status(500).json({ error: "Erro ao buscar categorias" });
	}
};

exports.createCategory = async (req, res) => {
	const { title, color, user_id } = req.body;

	try {
		if (!title) {
			return res.status(400).json({ message: "O campo 'title' é obrigatório." });
		}

		const newCategory = await Category.create({ title, color, user_id});

		res.status(201).json(newCategory);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};