import Cart from "../modal/cart.js";
import Service from "../modal/services.js";
import CartItem from "../modal/cartItemModal.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, serviceId, quantity } = req.body;

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, serviceId }
    });

    if (cartItem) {
      cartItem.quantity += quantity*1;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        serviceId,
        quantity
      });
    }

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart', error });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity*1;
    await cartItem.save();

    res.json({ message: 'Cart item updated', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart item', error });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        include: [Service]
      }
    });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.json(cart.CartItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve cart items', error });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();

    res.json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove cart item', error });
  }
};
