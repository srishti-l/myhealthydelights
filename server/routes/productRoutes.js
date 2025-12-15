import express from 'express';
import { productControllers } from '../controllers/productControllers.js';
import { authenticateJWT, authorize } from '../middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.get('/', productControllers.getProducts);
productRouter.get('/category/:category', productControllers.getProductByCategory);
productRouter.get('/:id', productControllers.getProductById);

// ADMIN ONLY OPERATIONS
productRouter.post('/', authenticateJWT, authorize("admin"), productControllers.addProduct);
productRouter.patch('/:id', authenticateJWT, authorize("admin"), productControllers.updateProduct);
productRouter.delete('/:id', authenticateJWT, authorize("admin"), productControllers.deleteProduct);

export { productRouter };
