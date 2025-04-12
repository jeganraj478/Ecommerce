import express from 'express';
import cartController from '../controllers/cartController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, cartController.getCart);
router.post('/add', authMiddleware, cartController.addToCart);
router.delete('/remove', authMiddleware, cartController.removeFromCart);

export default router;