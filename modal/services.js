import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconection.js';
import Vendor from './vendorModel.js';
import Category from './categoryModal.js';
import Subcategory from './subCategoryModal.js';

const Service = sequelize.define('Service', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: Vendor,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subcategory,
            key: 'id'
        }
    },
});

Vendor.hasMany(Service, { foreignKey: 'vendorId' });
Service.belongsTo(Vendor, { foreignKey: 'vendorId' });

Category.hasMany(Service, { foreignKey: 'categoryId' });
Service.belongsTo(Category, { foreignKey: 'categoryId' });

Subcategory.hasMany(Service, { foreignKey: 'subCategoryId' });
Service.belongsTo(Subcategory, { foreignKey: 'subCategoryId' });

export default Service;
