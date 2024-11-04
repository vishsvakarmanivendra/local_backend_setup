import Order from "../modal/orderModal.js";
import OrderItem from "../modal/orderItemModal.js";
import Cart from "../modal/cart.js";
import CartItem from "../modal/cartItemModal.js";
import Service from "../modal/services.js";

export const placeOrderFromCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ where: { userId }, include: CartItem });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const order = await Order.create({ userId, totalAmount, status: 'pending' });

    await Promise.all(cart.CartItems.map(async (cartItem) => {
      const service = await Service.findByPk(cartItem.serviceId);
      const itemTotal = service.price * cartItem.quantity;
      
      await OrderItem.create({
        orderId: order.id,
        serviceId: cartItem.serviceId,
        quantity: cartItem.quantity,
        vendorId: service.vendorId,
        price: service.price
      });

      totalAmount += itemTotal;
    }));

    order.totalAmount = totalAmount;
    await order.save();

    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order from cart', error });
  }
};

export const placeSingleItemOrder = async (req, res) => {
  try {
    const { userId, serviceId, quantity } = req.body;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const totalAmount = service.price * quantity;
    const order = await Order.create({ userId, totalAmount, status: 'pending' });

    await OrderItem.create({
      orderId: order.id,
      serviceId,
      quantity,
      price: service.price,
      vendorId: service.vendorId,
    });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place single item order', error });
  }
};

export const getVendorOrders = async (req, res) => {
    const { vendorId } = req.params;
    try {
      const orderItems = await OrderItem.findAll({
        where: { vendorId },
        include: [
          {
            model: Order,
            attributes: ['id', 'userId', 'status', 'totalAmount', 'createdAt'],
          },
          {
            model: Service,
            attributes: ['name', 'price']
          }
        ]
      });
  
      if (!orderItems || orderItems.length === 0) {
        return res.status(404).json({ message: 'No orders found for this vendor.' });
      }
  
      // Structure response data to be vendor-friendly
      const vendorOrders = orderItems.map(item => ({
        orderId: item.Order.id,
        userId: item.Order.userId,
        status: item.Order.status,
        totalAmount: item.Order.totalAmount,
        createdAt: item.Order.createdAt,
        service: {
          id: item.serviceId,
          name: item.Service.name,
          price: item.Service.price
        },
        quantity: item.quantity,
        itemPrice: item.price
      }));
  
      res.status(200).json({ vendorOrders });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve vendor orders', error });
    }
  };
