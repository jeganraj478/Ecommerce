import { Request, Response } from 'express';
import cartService from '../services/cartService';
import { AuthRequest } from '../middlewares/authMiddleware';

const cartController = {
    // Get Cart
    getCart: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req as AuthRequest;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }

            const cart = await cartService.getCart(userId);

            if (!cart) {
                res.status(404).json({ message: 'Cart not found' });
                return;
            }

            const total = cartService.calculateTotal(cart);
            res.status(200).json({ cart, total });
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch cart', error });
        }
    },

    // Add to Cart
    addToCart: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req as AuthRequest;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }

            const cart = await cartService.addToCart(userId, req.body);

            res.status(200).json({ message: 'Item added to cart', cart });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add to cart', error });
        }
    },

    // Remove from Cart
    removeFromCart: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req as AuthRequest;

            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }

            const cart = await cartService.removeFromCart(userId, req.body);

            if (!cart) {
                res.status(404).json({ message: 'Cart not found' });
                return;
            }

            res.status(200).json({ message: 'Item removed from cart', cart });
        } catch (error) {
            res.status(500).json({ message: 'Failed to remove from cart', error });
        }
    }
};

export default cartController;
