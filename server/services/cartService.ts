import { Cart, ICart } from '../models/cart';
import { AddToCartDTO, RemoveFromCartDTO } from '../types/cartTypes';
import { Types } from 'mongoose';


const cartService = {
  getCart: async (userId: string): Promise<ICart | null> => {
    return await Cart.findOne({ user: userId }).populate('items.product');
  },

  addToCart: async (userId: string, data: AddToCartDTO): Promise<ICart> => {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === data.productId
    )

    if (existingItem) {
      existingItem.quantity += data.quantity;
      existingItem.price = data.price;
    } else {
      cart.items.push({
        product: new Types.ObjectId(data.productId),
        quantity: data.quantity,
        price: data.price,
      });
    }

    await cart.save();
    return cart;
  },

  removeFromCart: async (
    userId: string,
    data: RemoveFromCartDTO
  ): Promise<ICart | null> => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return null;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== data.productId
    );

    await cart.save();
    return cart;
  },

  calculateTotal: (cart: ICart): number => {
    return cart.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  },
}
export default cartService 
