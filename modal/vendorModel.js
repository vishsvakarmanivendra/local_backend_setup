import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";

const Vendor = sequelize.define('Vendor', {
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
        unique: true 
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    adhar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    currentLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categories: {
        type: DataTypes.JSON, 
        allowNull: false,
        validate: {
            isArray(value) {
                if (!Array.isArray(value)) {
                    throw new Error('Categories must be an array');
                }
                if (value.length < 1 || value.length > 3) {
                    throw new Error('Vendor must select at least 1 and at most 3 categories');
                }
            }
        }
    },
    workExperience: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    profilePhoto: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    serviceArea: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    toolsAvailable: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '1234'
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date(Date.now() + 15 * 60 * 1000)
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'), 
        defaultValue: 'pending',
        allowNull: false
    },
});

Vendor.sync()
  .then(() => {
    console.log("Vendor table created successfully.");
  })
  .catch((err) => {
    console.error("Failed to create Vendor table:", err);
  });

export default Vendor;
