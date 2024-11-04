import { DataTypes } from "sequelize";
import sequelize from "../db/dbconection.js";
import Order from "./orderModal.js";
import Service from "./services.js";
const OrderItem = sequelize.define('OrderItem', {
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    vendorId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    price: { type: DataTypes.FLOAT, allowNull: false },
});

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Service, { foreignKey: 'serviceId' });

export default OrderItem;