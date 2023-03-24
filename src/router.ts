import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { createProduct, deleteProduct, getOneProducts, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { handleInputErrors } from './module/midleware';


const router = Router();

// -- for product 
router.get('/product', getProducts)
router.get('/product/:id', getOneProducts)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)


// -- for update 
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional(),
    updateUpdate
)
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
)
router.delete('/update/:id', deleteUpdate)


// -- for updatepoints
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { }
)
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updatedId').exists().isString(),
    () => { }
)
router.delete('/updatepoint/:id', () => { })

export default router;