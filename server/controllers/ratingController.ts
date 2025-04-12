import { Request, Response } from 'express';
import { Types } from 'mongoose';
import ratingService  from '../services/ratingService';


export class RatingController {
    // Create a new rating
    async createRating(req: Request, res: Response): Promise<void> {
        try {
            const { userId, productId, rating, comment } = req.body;

            if (!userId || !productId || !rating) {
                res.status(400).json({ message: 'User ID, Product ID, and rating are required' });
                return;
            }

            if (rating < 1 || rating > 5) {
                res.status(400).json({ message: 'Rating must be between 1 and 5' });
                return;
            }

            const newRating = await ratingService.createRating({
                user: new Types.ObjectId(userId),
                product: new Types.ObjectId(productId),
                rating,
                comment,
                createdBy: userId // Using userId as createdBy
            });

            res.status(201).json(newRating);
        } catch (error: unknown) {
            // Properly type the error
            if (error instanceof Error) {
                if (error.message === 'User has already rated this product') {
                    res.status(400).json({ message: error.message });
                } else {
                    res.status(500).json({ message: 'Failed to create rating', error: error.message });
                }
            } else {
                // If it's not an Error object, handle it differently
                res.status(500).json({ message: 'Failed to create rating', error: 'Unknown error' });
            }
        }
    }

    // Update an existing rating
    async updateRating(req: Request, res: Response): Promise<void> {
        try {
            const { ratingId } = req.params;
            const { userId, rating, comment } = req.body;

            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }

            if (!rating && comment === undefined) {
                res.status(400).json({ message: 'Nothing to update' });
                return;
            }

            if (rating && (rating < 1 || rating > 5)) {
                res.status(400).json({ message: 'Rating must be between 1 and 5' });
                return;
            }

            const updatedRating = await ratingService.updateRating(
                ratingId,
                new Types.ObjectId(userId),
                { rating, comment }
            );

            res.status(200).json(updatedRating);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message === 'Rating not found or not authorized to update') {
                    res.status(404).json({ message: error.message });
                } else {
                    res.status(500).json({ message: 'Failed to update rating', error: error.message });
                }
            } else {
                res.status(500).json({ message: 'Failed to update rating', error: 'Unknown error' });
            }
        }
    }

    // Delete a rating
    async deleteRating(req: Request, res: Response): Promise<void> {
        try {
            const { ratingId } = req.params;
            const { userId } = req.body;

            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }

            await ratingService.deleteRating(ratingId, new Types.ObjectId(userId));

            res.status(200).json({ message: 'Rating deleted successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message === 'Rating not found or not authorized to delete') {
                    res.status(404).json({ message: error.message });
                } else {
                    res.status(500).json({ message: 'Failed to delete rating', error: error.message });
                }
            } else {
                res.status(500).json({ message: 'Failed to delete rating', error: 'Unknown error' });
            }
        }
    }

    // Get all ratings for a product
    async getProductRatings(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            const { page, limit, sort } = req.query;

            const ratings = await ratingService.getProductRatings(
                new Types.ObjectId(productId),
                {
                    page: page ? parseInt(page as string) : 1,
                    limit: limit ? parseInt(limit as string) : 10,
                    sort: sort as string
                }
            );

            res.status(200).json(ratings);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Failed to fetch ratings', error: error.message });
            } else {
                res.status(500).json({ message: 'Failed to fetch ratings', error: 'Unknown error' });
            }
        }
    }

    // Get rating statistics for a product
    async getProductRatingStats(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;

            const stats = await ratingService.getProductRatingStats(
                new Types.ObjectId(productId)
            );

            res.status(200).json(stats);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Failed to fetch rating statistics', error: error.message });
            } else {
                res.status(500).json({ message: 'Failed to fetch rating statistics', error: 'Unknown error' });
            }
        }
    }

    // Get a user's rating for a specific product
    async getUserProductRating(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            const { userId } = req.query;

            if (!userId) {
                res.status(400).json({ message: 'User ID is required as a query parameter' });
                return;
            }

            const rating = await ratingService.getUserProductRating(
                new Types.ObjectId(userId as string),
                new Types.ObjectId(productId)
            );

            if (!rating) {
                res.status(404).json({ message: 'Rating not found' });
                return;
            }

            res.status(200).json(rating);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Failed to fetch user rating', error: error.message });
            } else {
                res.status(500).json({ message: 'Failed to fetch user rating', error: 'Unknown error' });
            }
        }
    }
}