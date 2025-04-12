import { Types } from 'mongoose';
import { Rating, IRating } from '../models/rating';
import { Product } from '../models/product';

const ratingService = {
    // Create a new rating
    createRating: async (ratingData: {
        user: Types.ObjectId;
        product: Types.ObjectId;
        rating: number;
        comment?: string;
        createdBy?: string;
    }): Promise<IRating> => {
        try {
            // Create the rating
            const newRating = await Rating.create(ratingData);

            // Update product's average rating
            await ratingService.updateProductAverageRating(ratingData.product);

            return newRating;
        } catch (error: unknown) {
            // Check if it's a MongoDB error with code property
            if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
                throw new Error('User has already rated this product');
            }
            // Re-throw the original error
            throw error;
        }
    },

    // Update an existing rating
    updateRating: async (
        ratingId: string,
        userId: Types.ObjectId,
        updateData: {
            rating?: number;
            comment?: string;
        }
    ): Promise<IRating> => {
        // Find the rating and ensure it belongs to the user
        const rating = await Rating.findOne({
            _id: ratingId,
            user: userId
        });

        if (!rating) {
            throw new Error('Rating not found or not authorized to update');
        }

        // Update the rating fields
        if (updateData.rating !== undefined) {
            rating.rating = updateData.rating;
        }

        if (updateData.comment !== undefined) {
            rating.comment = updateData.comment;
        }

        // Save the updated rating
        await rating.save();

        // Update product's average rating
        await ratingService.updateProductAverageRating(rating.product);

        return rating;
    },

    // Delete a rating
    deleteRating: async (ratingId: string, userId: Types.ObjectId): Promise<boolean> => {
        // Find the rating and ensure it belongs to the user
        const rating = await Rating.findOne({
            _id: ratingId,
            user: userId
        });

        if (!rating) {
            throw new Error('Rating not found or not authorized to delete');
        }

        const productId = rating.product;

        // Delete the rating
        await rating.deleteOne();

        // Update product's average rating
        await ratingService.updateProductAverageRating(productId);

        return true;
    },

    // Get all ratings for a product
    getProductRatings: async (productId: Types.ObjectId, options: {
        page?: number;
        limit?: number;
        sort?: string;
    } = {}): Promise<{
        ratings: IRating[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }> => {
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;

        // Default sort by newest first
        const sort = options.sort || '-createdAt';

        const [ratings, total] = await Promise.all([
            Rating.find({ product: productId })
                .populate('user', 'name avatar')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Rating.countDocuments({ product: productId })
        ]);

        return {
            ratings,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        };
    },

    // Get rating statistics for a product
    getProductRatingStats: async (productId: Types.ObjectId): Promise<{
        averageRating: number;
        totalRatings: number;
        distribution: Record<number, number>;
    }> => {
        const ratings = await Rating.find({ product: productId }, 'rating');

        if (ratings.length === 0) {
            return {
                averageRating: 0,
                totalRatings: 0,
                distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            };
        }

        // Calculate distribution
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let sum = 0;

        ratings.forEach(r => {
            sum += r.rating;
            if (r.rating >= 1 && r.rating <= 5) {
                distribution[r.rating as 1 | 2 | 3 | 4 | 5]++;
            }
        });
        return {
            averageRating: sum / ratings.length,
            totalRatings: ratings.length,
            distribution
        };
    },

    // Get a user's rating for a specific product
    getUserProductRating: async (userId: Types.ObjectId, productId: Types.ObjectId): Promise<IRating | null> => {
        return Rating.findOne({
            user: userId,
            product: productId
        });
    },

    // To update a product's average rating
    updateProductAverageRating: async (productId: Types.ObjectId): Promise<void> => {
        const stats = await ratingService.getProductRatingStats(productId);

        await Product.findByIdAndUpdate(productId, {
            averageRating: stats.averageRating,
            ratingCount: stats.totalRatings
        });
    }
};

export default ratingService;
