import { Router } from 'express';
import { RatingController } from '../controllers/ratingController';

const router = Router();
const ratingController = new RatingController();

// Create a new rating
router.post('/', ratingController.createRating.bind(ratingController));

// Update an existing rating
router.put('/:ratingId', ratingController.updateRating.bind(ratingController));

// Delete a rating
router.delete('/:ratingId', ratingController.deleteRating.bind(ratingController));

// Get all ratings for a product
router.get('/product/:productId', ratingController.getProductRatings.bind(ratingController));

// Get rating statistics for a product
router.get('/product/:productId/stats', ratingController.getProductRatingStats.bind(ratingController));

// Get a user's rating for a specific product
router.get('/product/:productId/user', ratingController.getUserProductRating.bind(ratingController));

export default router;