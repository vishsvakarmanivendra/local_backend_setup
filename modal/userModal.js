import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
        validate: {
            isEmail: true 
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true 
    },
    currentLocation: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    password: {
        type: DataTypes.STRING
    },
    userImage: {
        type: DataTypes.STRING
    }
});

User.sync()
    .then(() => {
        console.log("User table synced successfully.");
    })
    .catch((err) => {
        console.error("Failed to sync User table:", err);
    });

export default User;
