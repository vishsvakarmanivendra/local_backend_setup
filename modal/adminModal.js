import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";

const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'admin',
        allowNull: false,
    },
}, {
    tableName: 'admins',
    timestamps: true,
});
export default Admin;
sequelize.sync().then(res => {
    console.log("all good")
}).catch(err => {
    console.log("not good")
})