import { Router } from "express";
import { login } from "../../controllers/loginController";
import { validateJwt } from "../../middlewares/validateJwt";
import { validateRole } from "../../middlewares/validateRoles";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../../controllers/productController";

const router:Router = Router();

router.get('/products',[validateJwt],validateRole(['administrador','cliente']),getProducts)
router.get('/products/:id',[validateJwt],validateRole(['administrador','cliente']),getProductById)
router.put('/products/:id',[validateJwt],validateRole(['administrador']),updateProduct)
router.delete('/products/:id',[validateJwt],validateRole(['administrador']),deleteProduct)
router.post('/products', [
  validateJwt,validateRole(['administrador']),
],addProduct)
router.post('/auth/login',login);


export default router; 