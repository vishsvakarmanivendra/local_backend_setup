import Category from "../modal/categoryModal.js";
import Subcategory from "../modal/subCategoryModal.js";
import Vendor from "../modal/vendorModel.js";
import Service from "../modal/services.js";

export const createService = async (req, res) => {
  try {
    const { name, price, vendorId, categoryId, subCategoryId } = req.body;

    const vendor = await Vendor.findByPk(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const category = await Category.findByPk(categoryId);
    const subcategory = await Subcategory.findByPk(subCategoryId);
    if (!category || !subcategory) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }

    const newService = await Service.create({
      name,
      price,
      vendorId,
      categoryId,
      subCategoryId,
    });

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: Vendor,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: Subcategory,
          attributes: ['name', 'subCategoryImage'],
        }
      ]
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.query;

    const service = await Service.findByPk(id, {
      include: [
        {
          model: Vendor,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: Subcategory,
          attributes: ['name', 'subCategoryImage'], 
        }
      ]
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id, name, price, categoryId, subCategoryId } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const category = await Category.findByPk(categoryId);
    const subcategory = await Subcategory.findByPk(subCategoryId);
    if (!category || !subcategory) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }

    await service.update({
      name,
      price,
      categoryId,
      subCategoryId,
    });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.query;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
