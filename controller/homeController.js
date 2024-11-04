import Category from "../modal/categoryModal.js";
import Subcategory from "../modal/subCategoryModal.js";

export const getAllCategoriesWithSubcategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
        attributes: ['id', 'name'],
        include: [{
          model: Subcategory,
          attributes: ['id', 'name', 'subCategoryImage']
        }]
    });
    
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
