import { DataTypes } from 'sequelize';
import User from './userModal.js';
import sequelize from '../db/dbconection.js';

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'cart',
  timestamps: true
});

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

export default Cart;