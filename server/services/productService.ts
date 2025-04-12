import { Product, IProduct } from '../models/product';
import { ProductQueryParams, ProductResponse } from '../types/productTypes'


const productService = {
    createProduct: async (data: Partial<IProduct>): Promise<IProduct> => {
        const newProduct = new Product(data)
        return await newProduct.save();
    },

    getProducts: async ({ category, search, sort, limit, page }: ProductQueryParams): Promise<ProductResponse> => {
        const query: any = {};

        // Filter by category if provided
        if (category) {
            query.category = category;
        }

        // Search by name or description
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Determine sort options
        let sortOptions = {};
        if (sort === 'price-asc') {
            sortOptions = { price: 1 };
        } else if (sort === 'price-desc') {
            sortOptions = { price: -1 };
        } else if (sort === 'rating') {
            sortOptions = { averageRating: -1 };
        } else {
            sortOptions = { createdAt: -1 }; // Default: newest first
        }

        const skip = (page - 1) * limit;

        const productsData = await Product.aggregate([
            { $match: query }, // Filter data based on the query
            {
                $facet: {
                    products: [
                        { $sort: sortOptions }, // Sort the data
                        { $skip: skip },        // Skip for pagination
                        { $limit: limit }       // Limit for pagination
                    ],
                    totalCount: [
                        { $count: "total" }     // total count using $count
                    ]
                }
            }
        ]);

        // Extracting data from the result
        const products = productsData[0]?.products || [];
        const total = productsData[0]?.totalCount[0]?.total || 0;

        return {
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
        };

    },

    getAllProducts: async (): Promise<IProduct[]> => {
        return await Product.find()
    },

    getProductById: async (productId: string): Promise<IProduct | null> => {
        return await Product.findById(productId)
    },

    updateProduct: async (productId: string, data: Partial<IProduct>): Promise<IProduct | null> => {
        return await Product.findByIdAndUpdate(productId, data, { new: true });
    },

    deleteProduct: async (productId: string): Promise<IProduct | null> => {
        return await Product.findByIdAndDelete(productId);
    },

};

export default productService;
