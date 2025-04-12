import { Request, Response } from "express";
import productService from '../services/productService';

const productController = {
    createProduct: async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error });
        }
    },
    getProducts: async (req: Request, res: Response) => {
        try {
            const { category, search, sort, limit = 10, page = 1 } = req.query;

            const result = await productService.getProducts({
                category: category as string,
                search: search as string,
                sort: sort as string,
                limit: Number(limit),
                page: Number(page)
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Get products error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    getAllProducts: async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    },

    getProductById: async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' })
                return;
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    },

    updateProduct: async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await productService.updateProduct(req.params.id, req.body);
            if (!product) {
                res.status(404).json({ message: 'Product not found' })
                return
            };
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    },

    deleteProduct: async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await productService.deleteProduct(req.params.id);
            if (!product) {
                res.status(404).json({ message: 'Product not found' })
                return
            };
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
    
};

export default productController;


