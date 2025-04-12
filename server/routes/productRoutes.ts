// routes/product.routes.ts
import { Router } from 'express';
import productController from '../controllers/productController';

const router = Router();

// Create product
router.post('/', productController.createProduct);

// Get all products based on limit
router.get('/', productController.getProducts);

// Get all products
router.get('/', productController.getAllProducts);

// Get single product
router.get('/:id', productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

// Add Rating to  products
router.post('/:id/rate', productController.getAllProducts);


export default router;
