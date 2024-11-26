import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.mid.js';
import * as productController from '../controllers/product.controller.js';

import { getAnalysis } from '../controllers/getServices.controller.js'

const router = Router();

router.route('/all')
    .get(productController.getAllProducts);

router.route('/analyze/:id')
    .post(verifyToken, getAnalysis, productController.createProduct);

router.route('/:id')
    .get(verifyToken, productController.getProductById)
    .put(verifyToken, productController.updateProduct)
    .delete(verifyToken, productController.deleteProduct);

export default router;