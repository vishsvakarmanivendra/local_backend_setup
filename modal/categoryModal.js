import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconection.js';

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'categories',
    timestamps: true,
});
Category.sync().then(res => {
    console.log("all good")
}).catch(err => {
    console.log("not good")
})

export default Category;
