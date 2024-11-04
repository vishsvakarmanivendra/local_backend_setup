import { DataTypes } from 'sequelize';
import Cart from './cart.js';
import Service from './services.js';
import sequelize from '../db/dbconection.js';

const CartItem = sequelize.define('CartItem', {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
      key: 'id'
    }
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Service,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'cart_items',
  timestamps: true
});

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Service.hasMany(CartItem, { foreignKey: 'serviceId' });
CartItem.belongsTo(Service, { foreignKey: 'serviceId' });

export default CartItem;